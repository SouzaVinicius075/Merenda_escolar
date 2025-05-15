create table zonas(
  id serial primary key,
  nome varchar(15)
);

create table acessos (
	id serial primary key,
  nome varchar(10)
);

create table usuarios(
  
  id serial primary key,
  acesso int references acessos(id),
	nome varchar(40) not null,
	email varchar(30) not null,
	senha varchar(100) not null,
  ativo bool default true
);

create table escolas(
	id serial primary key,
  cnpj varchar(14) not null,
	nome varchar(140) not null,
  zona int references zonas(id),
	endereco varchar(140) not null,
  gestorid int references usuarios(id)
);

create table refeicoes (
  id serial primary key,
  nome varchar(15)
);

create table pedidos (
  id serial primary key,
  data_pedido timestamp default NOW(),
  data_entrega date not null,
  creche int default 0,
  pre_escola int default 0,
  fund int default 0,
  func int default 0,
	tipo_ref int references refeicoes(id),
	escola_id int references escolas(id),
  entregue bool default false
);

create table entregas (
  id serial primary key,
  id_pedido int references pedidos(id),
  creche int default 0,
  pre_escola int default 0,
  fund int default 0,
  func int default 0
);

create table tokens (
  id int references escolas(id),
  token varchar(255)
);

create table dias (
  id serial primary key,
  nome varchar(15)
);

create table cardapios (
  id serial primary key,
  nome varchar(100),
  diaId int references dias(id),
  tipo_ref int references refeicoes(id)
);

