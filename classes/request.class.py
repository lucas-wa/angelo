class Requisicao:
    def _init_(self, uuid, tipo, status, resposta, data, usuario_requisitante, image):
        self.uuid = uuid
        self.tipo = tipo
        self.status = status
        self.resposta = resposta
        self.data_requisicao = data
        self.usuario_requisitante = usuario_requisitante
        self.image = image

    def consultar_requisicao(self):
        return {
            "uuid": self.uuid,
            "tipo": self.tipo,
            "status": self.status,
            "resposta": self.resposta,
            "data_requisicao": self.data_requisicao,
            "usuario_requisitante": self.usuario_requisitante.nome
        }

    def deletar_requisicao(self):
        # Adicione lógica para excluir a requisição
        pass

    # getters
    def get_uuid(self):
        return self.uuid
    
    def get_tipo(self):
        return self.tipo
    
    def get_status(self):
        return self.status
    
    def get_resposta(self):
        return self.resposta
    
    def get_data_requisicao(self):
        return self.data_requisicao
    
    def get_usuario_requisitante(self):
        return self.usuario_requisitante
    
    def get_image(self):
        return self.image
    
    # setters
    def set_uuid(self, uuid):
        self.uuid = uuid

    def set_tipo(self, tipo):
        self.tipo = tipo

    def set_status(self, status):
        self.status = status

    def set_resposta(self, resposta):
        self.resposta = resposta

    def set_data_requisicao(self, data):
        self.data_requisicao = data

    def set_usuario_requisitante(self, usuario):
        self.usuario_requisitante = usuario

    def set_image(self, image):
        self.image = image
