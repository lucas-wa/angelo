import io
import torch
import base64
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16)
pipe = pipe.to("cuda")

class StableDiffusion:
    def _init_(self, caminho, prompt):
        self.caminho = caminho
        self.prompt = prompt

    def gerar_imagem(self):
        # Adicione lógica para a geração de imagem usando Stable Diffusion
        try:
            image = pipe(self.prompt).images[0]
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue())
            b = "data:image/png;base64," + str(img_str)[2:-1]
            return b
        except Exception as e:
            raise Exception("Image could not be generated!")
            return str(e)