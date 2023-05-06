// Prestamos almacenados en formato JSON
var prestamos = [];

// Obtener referencias a elementos del DOM
var searchInput = document.getElementById('searchInput');
var resultsList = document.getElementById('resultsList');
var registerForm = document.getElementById('registerForm');
var nameInput = document.getElementById('nameInput');
var lastNameInput = document.getElementById('lastNameInput');
var debtInput = document.getElementById('debtInput');

// Cargar los deudores almacenados en el Storage al iniciar la página
window.onload = function() {
  cargarPrestamos();
}

// Función para buscar deudores por apellido
function buscarDeudores(apellido) {
  // Limpiar resultados anteriores
  resultsList.innerHTML = '';

  // Filtrar deudores por apellido
  var resultados = prestamos.filter(function(prestamo) {
    return prestamo.apellido.toLowerCase().includes(apellido.toLowerCase());
  });

  // Mostrar resultados en la lista
  resultados.forEach(function(prestamo) {
    var li = document.createElement('li');
    li.textContent = prestamo.nombre + ' ' + prestamo.apellido + ' - Deuda: $' + prestamo.deuda;
    resultsList.appendChild(li);
  });
}

// Función para registrar un nuevo deudor
function registrarDeudor(nombre, apellido, deuda) {
  // Crear un objeto deudor
  var nuevoPrestamo = {
    nombre: nombre,
    apellido: apellido,
    deuda: deuda
  };

  // Agregar el deudor a la lista de deudores
  prestamos.push(nuevoPrestamo);

  // Guardar los deudores actualizados en el Storage
  guardarPrestamos();

  // Limpiar el formulario de registro
  nameInput.value = '';
  lastNameInput.value = '';
  debtInput.value = '';

  // Mostrar mensaje de éxito en el DOM
  var successMessage = document.getElementById('successMessage');
  successMessage.textContent = 'Deudor registrado exitosamente.';
  successMessage.style.display = 'block';

  // Ocultar el mensaje después de 3 segundos
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 3000);
}

// Función para guardar los deudores en el Storage
function guardarPrestamos() {
  localStorage.setItem('prestamos', JSON.stringify(prestamos));
}

// Función para cargar los deudores desde el Storage
function cargarPrestamos() {
  var prestamosGuardados = localStorage.getItem('prestamos');
  if (prestamosGuardados) {
    prestamos = JSON.parse(prestamosGuardados);
  }
}

// Manejador de evento para el input de búsqueda
searchInput.addEventListener('input', function(event) {
  var texto = event.target.value;
  buscarDeudores(texto);
});

// Manejador de evento para el formulario de registro
registerForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var nombre = nameInput.value;
  var apellido = lastNameInput.value;
  var deuda = debtInput.value;

  if (nombre && apellido && deuda) {
    registrarDeudor(nombre, apellido, deuda);
  } else {
    alert('Por favor, completa todos los campos.');
  }
});
