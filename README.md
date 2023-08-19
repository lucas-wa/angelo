# Angelo

Esta é uma aplicação web que utiliza o framework Flask juntamente com o serviço Ngrok para disponibilizar uma interface de usuário que permite realizar a 
geração e modificação de imagens com o algoritmo de stable diffusion, além de aumentar a resolução de imagens com o RealESRGAN.

## Instalação

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/lucas-wa/angelo.git
```

2. Navegue até o diretório do projeto:

```bash
cd angelo
```

3. Crie uma conta no site do Ngrok e adquira um token que permita a criação de um túnel: https://ngrok.com/

4. Substitua seu token no arquivo app.ipynb:
   
  ![image](https://github.com/lucas-wa/angelo/assets/72520736/8bb2753e-f2d4-4889-b1fa-873ca5b52342)

5. Execute todos os notebooks do arquivo app.ipynb:

obs) Execute todos os notebooks apenas na primeira vez em que precisar executar o server. Depois disso, é possível reinicializá-lo apenas executando o notebbok onde o servidor Flask é inicializado. 
Esse notebook se parecerá com esse:

![image](https://github.com/lucas-wa/angelo/assets/72520736/8cbc3df0-c949-4fa4-ab70-be5b902cafcd)


6. Acesse a aplicação em seu navegador em através do link que aparecerá no notebook que inicializa o Flask. O output deve se parecer com esse:

![image](https://github.com/lucas-wa/angelo/assets/72520736/2a6e82ae-fc8d-473c-96b5-87fa6a9b03a2)

obs) Assim como o aviso que aparece no output, é recomendado não utilizar esse servidor em produção sem implementação correta de um WSGI adequado: https://flask.palletsprojects.com/en/2.0.x/deploying/

## Créditos

- Este projeto utiliza o framework Flask. Saiba mais em: https://flask.palletsprojects.com/
- O serviço Ngrok é utilizado para disponibilizar a aplicação na web. Saiba mais em: https://ngrok.com/
- O algoritmo utiliza stable diffusion: https://github.com/CompVis/stable-diffusion.
- A técnica de aumento de resolução utiliza o RealESRGAN. Saiba mais em: https://github.com/xinntao/Real-ESRGAN
