create database biblioteca;
use biblioteca;

create table categorias(
	id_categoria int primary key auto_increment,
    nombre varchar(30)
);

create table usuarios(
	id_usuario int primary key auto_increment,
    nombre varchar(30)
);

create table libros(
	id_libro int primary key auto_increment,
    Titulo varchar(100),
    anio_publicacion varchar(10),
    isbn varchar(20),
    cantidad int,
    id_categorias int,
    foreign key (id_categorias) references categorias(id_categoria)
);

create table prestamos(
	id_prestamo int primary key auto_increment,
    devolucion_real varchar(10),
    fecha_prestamo varchar(10),
    fecha_prevista varchar(10),
    libro int,
    usuario int,
    foreign key (libro) references libros(id_libro),
    foreign key (usuario) references usuarios(id_usuario)
);