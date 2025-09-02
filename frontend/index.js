const API = "http://localhost:3000/api";

// ---------- USUARIOS ----------
document.getElementById("form-usuario").addEventListener("submit", async e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-usuario").value;

  await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre })
  });

  e.target.reset();
  cargarUsuarios();
});

async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  const data = await res.json();
  const contenedor = document.getElementById("usuarios");
  contenedor.innerHTML = "";
  data.forEach(u => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${u.nombre}</h3>
        <p><b>ID:</b> ${u.id_usuario}</p>
        <div class="acciones">
          <button onclick="editarUsuario(${u.id_usuario}, '${u.nombre}')">Editar</button>
          <button onclick="eliminarUsuario(${u.id_usuario})">Eliminar</button>
        </div>
      </div>`;
  });
}

async function eliminarUsuario(id) {
  await fetch(`${API}/usuarios/${id}`, { method: "DELETE" });
  cargarUsuarios();
}

async function editarUsuario(id, nombreActual) {
  const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
  if (nuevoNombre) {
    await fetch(`${API}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre })
    });
    cargarUsuarios();
  }
}

// ---------- CATEGORÍAS ----------
document.getElementById("form-categoria").addEventListener("submit", async e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-categoria").value;

  await fetch(`${API}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre })
  });

  e.target.reset();
  cargarCategorias();
});

async function cargarCategorias() {
  const res = await fetch(`${API}/categorias`);
  const data = await res.json();
  const contenedor = document.getElementById("categorias");
  contenedor.innerHTML = "";
  data.forEach(c => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${c.nombre}</h3>
        <p><b>ID:</b> ${c.id_categoria}</p>
        <div class="acciones">
          <button onclick="editarCategoria(${c.id_categoria}, '${c.nombre}')">Editar</button>
          <button onclick="eliminarCategoria(${c.id_categoria})">Eliminar</button>
        </div>
      </div>`;
  });
}

async function eliminarCategoria(id) {
  await fetch(`${API}/categorias/${id}`, { method: "DELETE" });
  cargarCategorias();
}

async function editarCategoria(id, nombreActual) {
  const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
  if (nuevoNombre) {
    await fetch(`${API}/categorias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre })
    });
    cargarCategorias();
  }
}

// ---------- LIBROS ----------
document.getElementById("form-libro").addEventListener("submit", async e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo-libro").value;
  const ISBN = document.getElementById("isbn-libro").value;
  const anio_publicacion = document.getElementById("anio-libro").value;
  const id_categorias = document.getElementById("categoria-libro").value;

  await fetch(`${API}/libros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, ISBN, anio_publicacion, id_categorias })
  });

  e.target.reset();
  cargarLibros();
});

async function cargarLibros() {
  const res = await fetch(`${API}/libros`);
  const data = await res.json();
  const contenedor = document.getElementById("libros");
  contenedor.innerHTML = "";
  data.forEach(l => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>${l.titulo}</h3>
        <p><b>ID:</b> ${l.id_libro}</p>
        <p><b>ISBN:</b> ${l.isbn}</p>
        <p><b>Año:</b> ${l.anio_publicacion}</p>
        <p><b>Categoría:</b> ${l.categoria}</p>
        <div class="acciones">
          <button onclick="editarLibro(${l.id_libro}, '${l.titulo}')">Editar</button>
          <button onclick="eliminarLibro(${l.id_libro})">Eliminar</button>
        </div>
      </div>`;
  });
}

async function eliminarLibro(id) {
  await fetch(`${API}/libros/${id}`, { method: "DELETE" });
  cargarLibros();
}

async function editarLibro(id, tituloActual) {
  const nuevoTitulo = prompt("Nuevo título:", tituloActual);
  if (nuevoTitulo) {
    await fetch(`${API}/libros/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: nuevoTitulo })
    });
    cargarLibros();
  }
}

// ---------- PRÉSTAMOS ----------
document.getElementById("form-prestamo").addEventListener("submit", async e => {
  e.preventDefault();
  const fecha_prestamo = document.getElementById("fecha-prestamo").value;
  const fecha_prevista = document.getElementById("fecha-prevista").value;
  const libro = document.getElementById("id-libro-prestamo").value;
  const usuario = document.getElementById("id-usuario-prestamo").value;

  await fetch(`${API}/prestamos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fecha_prestamo, fecha_prevista, libro, usuario })
  });

  e.target.reset();
  cargarPrestamos();
});

async function cargarPrestamos() {
  const res = await fetch(`${API}/prestamos`);
  const data = await res.json();
  const contenedor = document.getElementById("prestamos");
  contenedor.innerHTML = "";
  data.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <h3>Préstamo #${p.id_prestamo}</h3>
        <p><b>Libro:</b> ${p.libro}</p>
        <p><b>Usuario:</b> ${p.usuario}</p>
        <p><b>Fecha préstamo:</b> ${p.fecha_prestamo}</p>
        <p><b>Fecha prevista:</b> ${p.fecha_prevista}</p>
        <p><b>Devolución:</b> ${p.devolucion_real || "Pendiente"}</p>
        ${!p.devolucion_real ? `<button onclick="registrarDevolucion(${p.id_prestamo})">Registrar devolución</button>` : ""}
      </div>`;
  });
}

async function registrarDevolucion(id) {
  const fecha = prompt("Ingrese la fecha de devolución real (YYYY-MM-DD):");
  if (fecha) {
    await fetch(`${API}/prestamos/${id}/devolucion`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ devolucion_real: fecha })
    });
    cargarPrestamos();
  }
}

// ---------- CARGA INICIAL ----------
cargarUsuarios();
cargarCategorias();
cargarLibros();
cargarPrestamos();
