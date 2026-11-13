DROP DATABASE IF EXISTS lojinha;

CREATE DATABASE lojinha;
USE lojinha;

CREATE TABLE produtos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DOUBLE NOT NULL
);

INSERT INTO produtos(nome, descricao, preco) VALUES
('Mouse', 'Mouse Gamer Redragon', 119.90),
('Livro', 'Livro de Guerra', 89.90),
('Teclado', 'Teclado Gamer Redragon', 69.99);

SELECT * FROM produtos WHERE descricao LIKE "%redragon";