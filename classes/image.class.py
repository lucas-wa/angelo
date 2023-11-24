class Imagem:
    def _init_(self, uuid, tamanho, funcao, origem, data, uri):
        self.uuid = uuid
        self.tamanho = tamanho
        self.funcao = funcao
        self.origem = origem
        self.data_criacao = data
        self.URI = uri

    def consultar_imagem(self):
        return {
            "uuid": self.uuid,
            "tamanho": self.tamanho,
            "funcao": self.funcao,
            "origem": self.origem,
            "data_criacao": self.data_criacao,
            "URI": self.URI
        }

    def baixar_imagem(self):
        pass

    def deletar_imagem(self):
        pass

    # getters
    def get_uuid(self):
        return self.uuid
    
    def get_tamanho(self):
        return self.tamanho
    
    def get_funcao(self):
        return self.funcao
    
    def get_origem(self):
        return self.origem
    
    def get_data_criacao(self):
        return self.data_criacao
    
    def get_URI(self):
        return self.URI
    
    # setters
    def set_uuid(self, uuid):
        self.uuid = uuid

    def set_tamanho(self, tamanho):
        self.tamanho = tamanho
    
    def set_funcao(self, funcao):
        self.funcao = funcao

    def set_origem(self, origem):
        self.origem = origem

    def set_data_criacao(self, data):
        self.data_criacao = data
    
    def set_URI(self, uri):
        self.URI = uri
