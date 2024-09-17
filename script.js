const inputNombre = document.getElementById("contactName");
const button = document.getElementById("addContact");
const lista = document.getElementById("contactList");

button.addEventListener("click", actualizarLista);

function agregarElemento() {
  const contacName = inputNombre.value.trim();
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = contacName;

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => editarNombre(span));

  const eliminarButton = document.createElement("button");
  eliminarButton.textContent = "Eliminar";
  eliminarButton.addEventListener("click", () => li.remove());

  function editarNombre(spanElemento) {
    const nuevoNombre = prompt("Edita el nombre:", spanElemento.textContent);
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
      spanElemento.textContent = nuevoNombre.trim();
    }
  }
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(eliminarButton);
  return li;
}

function actualizarLista() {
  const nuevo = inputNombre.value.trim();
  if (nuevo) {
    const nuevoElemento = agregarElemento(nuevo);
    lista.appendChild(nuevoElemento);
    inputNombre.value = "";
  }
}
