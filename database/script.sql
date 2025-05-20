show databases;
create database db_planify;
use db_planify;

CREATE TABLE tbl_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(12) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto_perfil VARCHAR(500),
    palavra_chave VARCHAR(15) NOT NULL
);

CREATE TABLE tbl_categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tbl_evento (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descricao TEXT,
    data_evento DATE NOT NULL,
    horario TIME NOT NULL,
    local VARCHAR(70) NOT NULL,
    imagem VARCHAR(500),
    limite_participante DECIMAL(10,2),
    valor_ingresso DECIMAL(10,2)
);

CREATE TABLE tbl_usuario_categoria (
    id_usuario_categoria INT PRIMARY KEY AUTO_INCREMENT,
    tbl_usuario_id_usuario INT NOT NULL,
    tbl_categoria_id_categoria INT NOT NULL,
    CONSTRAINT fk_usuario_categoria_usuario
        FOREIGN KEY (tbl_usuario_id_usuario)
        REFERENCES tbl_usuario(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_usuario_categoria_categoria
        FOREIGN KEY (tbl_categoria_id_categoria)
        REFERENCES tbl_categoria(id_categoria)
        ON DELETE CASCADE
);

CREATE TABLE tbl_evento_categoria (
    id_evento_categoria INT PRIMARY KEY AUTO_INCREMENT,
    tbl_categoria_id_categoria INT NOT NULL,
    tbl_evento_id_evento INT NOT NULL,
    CONSTRAINT fk_evento_categoria_categoria
        FOREIGN KEY (tbl_categoria_id_categoria)
        REFERENCES tbl_categoria(id_categoria)
        ON DELETE CASCADE,
    CONSTRAINT fk_evento_categoria_evento
        FOREIGN KEY (tbl_evento_id_evento)
        REFERENCES tbl_evento(id_evento)
        ON DELETE CASCADE
);

show tables;
