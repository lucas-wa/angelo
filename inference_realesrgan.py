import os
import cv2
import glob
import requests
import argparse
import numpy as np
from gfpgan import GFPGANer
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan.archs.srvgg_arch import SRVGGNetCompact
from basicsr.utils.download_util import load_file_from_url

OUTSCALE = 4
IMG_SUFFIX = 'upscaled'
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64,
                num_block=23, num_grow_ch=32, scale=4)
netscale = 4
model_path = os.path.join('weights', 'RealESRGAN_x4plus.pth')

file_url = 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth'
if not os.path.isfile(model_path):
    model_path = load_file_from_url(url=file_url, model_dir=os.path.join(
        'weights'), progress=True, file_name=None)

dni_weight = None

# restorer
upsampler = RealESRGANer(
    scale=netscale,
    model_path=model_path,
    dni_weight=dni_weight,
    model=model)


model_path = os.path.join('weights', 'GFPGANv1.3.pth')

if not os.path.isfile(model_path):  # Use GFPGAN for face enhancement
    file_url = 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth'
    model_path = load_file_from_url(url=file_url, model_dir=os.path.join(
        'weights'), progress=True, file_name=None)


face_enhancer = GFPGANer(
    model_path=model_path,
    upscale=OUTSCALE,
    arch='clean',
    channel_multiplier=2,
    bg_upsampler=upsampler)


def detect_face(image):
    face_cascade = cv2.CascadeClassifier()
    face_cascade_name = "weights/haarcascade_frontalface_alt.xml"

    if not os.path.isfile(face_cascade_name):
        try:
            file_url = 'https://raw.githubusercontent.com/avelino/python-opencv-detect/master/haarcascade_frontalface_alt.xml'
            model_path = load_file_from_url(url=file_url, model_dir=os.path.join(
                'weights'), progress=True, file_name=None)
        except:
            print('--(!)Error loading face cascade')
            exit(0)

    face_cascade.load(cv2.samples.findFile(face_cascade_name))

    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image_gray = cv2.equalizeHist(image_gray)

    faces = face_cascade.detectMultiScale(image_gray)

    return True if len(faces) > 0 else False


def upscale_image(image, imgname):
    # paths = sorted(glob.glob(os.path.join('images', '*')))
    npimg = np.fromstring(image, np.uint8)

    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    width = img.shape[1]
    height = img.shape[0]
    aspect_ratio = width/height;
    width_is_bigger = width > height;


    print(width, height, aspect_ratio)

    if width_is_bigger and width > 500:
      img = cv2.resize(img, (500, int(500 / aspect_ratio)))
    elif not width_is_bigger and height > 500:
      img = cv2.resize(img, (int(500 * aspect_ratio), 500))


    print(img.shape)

    if len(img.shape) == 3 and img.shape[2] == 4:
        img_mode = 'RGBA'
    else:
        img_mode = None

    try:
        if detect_face(img):
            print("Is face")
            _, _, output = face_enhancer.enhance(
                img, has_aligned=False, only_center_face=False, paste_back=True)
        else:
            print("Is not face")
            output, _ = upsampler.enhance(img, outscale=OUTSCALE)
    except RuntimeError as error:
        print('Error', error)
        print(
            'If you encounter CUDA out of memory, try to set --tile with a smaller number.')
    else:
        extension = imgname.split('.')[1]
        imgname = imgname.split('.')[0]

        if img_mode == 'RGBA':  # RGBA images should be saved in png format
            extension = 'png'

        save_path = os.path.join(
            'results', f'{imgname}_{IMG_SUFFIX}.{extension}')
        cv2.imwrite(save_path, output)

        return outputs
