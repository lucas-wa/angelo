class Prompt:
    def _init_(self, uuid, texto, tipo, requisicao, data, usuario_requisitante):
        self.uuid = uuid
        self.texto = texto
        self.tipo = tipo
        self.imagem_gerada = requisicao
        self.data_requisicao = data
        self.usuario_requisitante = usuario_requisitante

    def consultar_prompt(self):
        return {
            "uuid": self.uuid,
            "texto": self.texto,
            "tipo": self.tipo,
            "imagem_gerada": self.imagem_gerada,
            "data_requisicao": self.data_requisicao,
            "usuario_requisitante": self.usuario_requisitante.nome
        }

    def deletar_prompt(self):
        # Adicione lógica para excluir o prompt
        pass

    # getters
    def get_uuid(self):
        return self.uuid
    
    def get_texto(self):
        return self.texto
    
    def get_tipo(self):
        return self.tipo
    
    def get_imagem_gerada(self):
        pass

    def get_data_requisicao(self):
        return self.data_requisicao
    
    def get_usuario_requisitante(self):
        return self.usuario_requisitante
    
    # setters
    def set_uuid(self, uuid):
        self.uuid = uuid

    def set_texto(self, texto):
        self.texto = texto

    def set_tipo(self, tipo):
        self.tipo = tipo

    def set_imagem_gerada(self, imagem):
        self.imagem_gerada = imagem

    def set_data_requisicao(self, data):
        self.data_requisicao = data

    def set_usuario_requisitante(self, usuario):
        self.usuario_requisitante = usuario


    
