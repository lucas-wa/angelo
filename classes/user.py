class Usuario:
    def _init_(self, uuid, nome, email, senha, plano, data, horario):
        self.uuid = uuid
        self.nome = nome
        self.email = email
        self.senha = senha
        self.plano = plano
        self.data_criacao = data
        self.ultimo_visto = horario

    def editar_perfil(self, nome=None, email=None, senha=None):
        if nome:
            self.set_nome(nome)
        if email:
            self.set_email(email)
        if senha:
            self.set_senha(senha)

    def deletar_conta(self):
        pass

    # getters
    def get_uuid(self):
        return self.uuid
    
    def get_nome(self):
        return self.nome
    
    def get_email(self):
        return self.email
    
    def get_senha(self):
        return self.senha
    
    def get_plano(self):
        return self.plano
    
    def get_data_criacao(self):
        return self.data_criacao
    
    def get_ultimo_visto(self):
        return self.ultimo_visto
    
    # setters
    def set_uuid(self, uuid):
        self.uuid = uuid

    def set_nome(self, nome):
        self.nome = nome

    def set_email(self, email):
        self.email = email
    
    def set_senha(self, senha):
        self.senha = senha

    def set_plano(self, plano):
        self.plano = plano

    def set_data_criacao(self, data):
        self.data_criacao = data

    def set_ultimo_visto(self, horario):
        self.ultimo_visto = horario

    def consultar_usuario(self):
        return {
            "uuid": self.uuid,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "plano": self.plano,
            "data_criacao": self.data_criacao,
            "ultimo_visto": self.ultimo_visto
        }
    
    def deletar_usuario(self):
        # Adicione lógica para excluir o usuário
        pass

    def editar_usuario(self):
        # Adicione lógica para editar o usuário
        pass

    