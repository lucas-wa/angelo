import io
import torch
import base64
from PIL import Image
from diffusers import StableDiffusionInpaintPipeline

editor_pipe = StableDiffusionInpaintPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-inpainting",
    torch_dtype=torch.float16,
)
editor_pipe.to("cuda")

class StablePainting:
    def __init__(self, caminho, prompt):
        self.caminho = caminho
        self.prompt = prompt

    def editar_imagem(self, req):
          
        try:
            file = req['file']
            prompt = self.prompt
            mask = req["mask"]

            file = base64.b64decode(file)
            file = Image.open(io.BytesIO(file))

            mask = base64.b64decode(mask)
            mask = Image.open(io.BytesIO(mask))
            background = Image.new("RGB", mask.size, "white")
            background.paste(mask, (0, 0), mask)
            mask = Image.eval(background, lambda px: 255 - px)

            mask.save("msk.jpg")
            file.save("image.jpg")

            image = editor_pipe(prompt=prompt, image=file, mask_image=mask).images[0]

            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue())
            response = "data:image/png;base64," + str(img_str)[2:-1]
            return response

        
        except Exception as e:
            raise Exception("Image could not be generated!")
            return str(e)
