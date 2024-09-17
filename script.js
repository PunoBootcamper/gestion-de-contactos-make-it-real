const inputNombre = document.getElementById("contactName");
const button = document.getElementById("addContact");
const sortButton = document.getElementById("sortContacts");
const lista = document.getElementById("contactList");
const contactCount = document.getElementById("contactCount");

button.addEventListener("click", actualizarLista);
sortButton.addEventListener("click", ordenarContactos);

document.addEventListener("DOMContentLoaded", cargarContactos);

function agregarElemento(nombre) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = nombre;

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => editarNombre(span));

  const eliminarButton = document.createElement("button");
  eliminarButton.textContent = "Eliminar";
  eliminarButton.addEventListener("click", () => {
    li.remove();
    guardarContactos();
    actualizarContador();
  });

  function editarNombre(spanElemento) {
    const nuevoNombre = prompt("Edita el nombre:", spanElemento.textContent);
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
      spanElemento.textContent = nuevoNombre.trim();
      guardarContactos();
    }
  }

  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(eliminarButton);
  return li;
}

function actualizarLista() {
  const nuevo = inputNombre.value.trim();
  
  const existe = Array.from(lista.children).some((item) => {
    return item.querySelector("span").textContent.toLowerCase() === nuevo.toLowerCase();
  });

  if (nuevo && !existe) {
    const nuevoElemento = agregarElemento(nuevo);
    lista.appendChild(nuevoElemento);
    inputNombre.value = "";
    guardarContactos();
    actualizarContador();
  } else if (existe) {
    alert("Este contacto ya existe en la lista.");
  }
}

function actualizarContador() {
  const totalContactos = lista.children.length;
  contactCount.textContent = `Total de contactos: ${totalContactos}`;
}

function ordenarContactos() {
  const items = Array.from(lista.children);
  items.sort((a, b) => {
    const nombreA = a.querySelector("span").textContent.toLowerCase();
    const nombreB = b.querySelector("span").textContent.toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
  
  items.forEach(item => lista.appendChild(item));
  guardarContactos();
}

function guardarContactos() {
  const contactos = Array.from(lista.children).map(item => 
    item.querySelector("span").textContent
  );
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

function cargarContactos() {
  const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || [];
  contactosGuardados.forEach(nombre => {
    const elemento = agregarElemento(nombre);
    lista.appendChild(elemento);
  });
  actualizarContador();
}
