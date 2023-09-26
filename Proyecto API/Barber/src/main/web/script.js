//LISTAR BARBEROS
function mostrarContenido(nombre) {
  // Ocultar todos los contenidos excepto el seleccionado
  var contenidos = document.querySelectorAll("#contenido > div");
  for (var i = 0; i < contenidos.length; i++) {
    if (contenidos[i].id === nombre) {
      contenidos[i].style.display = "block"; // Mostrar contenido seleccionado
    } else {
      contenidos[i].style.display = "none"; // Ocultar otros contenidos
    }
  }

  // Mostrar los botones en la sección "Barberos" si se selecciona "Barberos"
  if (nombre === "Barberos") {
    mostrarBotonesBarberos();
  } else if(nombre === "Clientes"){
    mostrarBotonesClientes();
  } else if(nombre === "Sucursales"){
    mostrarBotonesSucursales();
  } else if(nombre === "Turnos"){
    mostrarBotonesTurnos();
  }
}

function mostrarBotonesBarberos() {
  var botonesBarberos = document.querySelector("#Barberos").querySelectorAll("button");
  for (var j = 0; j < botonesBarberos.length; j++) {
    botonesBarberos[j].style.display = "inline-block";
  }
}

function listarBarberos() {
  fetch('http://localhost:8080/barbero/obtener')
    .then(response => response.json())
    .then(data => {
      mostrarListaBarberos(data);

    })
    .catch(error => {
      console.error('Error al obtener la lista de barberos:', error);
    });
}

function mostrarListaBarberos(barberos) {
  var listaBarberosHTML = '<h1 style="font-size: 16px;">Barberos</h1>' +
                          '<button onclick="listarBarberos()">Listar</button>' +
                          '<button onclick="crearBarbero()">Crear</button>' +
                          '<button onclick="buscarBarberodni()">Gestionar</button>' +
                          '<div id="tituloBarberos">Lista de Barberos</div>' +
                          '<ul class="lista-barberos">';

  for (var i = 0; i < barberos.length; i++) {
    listaBarberosHTML += '<li>' +
                         '<strong>DNI: </strong>' + barberos[i].dni + '<br>' +
                         '<strong>Nombre: </strong>' + barberos[i].nombre + '<br>' +
                         '<strong>Apellido: </strong>' + barberos[i].apellido + '<br>' +
                         '<strong>Telefono: </strong>' + barberos[i].nro_telefono + '<br>' +
                         '<strong>Correo electronico: </strong>' + barberos[i].mail +
                         '</li>';
  }
  listaBarberosHTML += '</ul>';

  var contenidoBarberos = document.getElementById('Barberos');
  contenidoBarberos.innerHTML = listaBarberosHTML;
}


//CREACION DE  BARBERO
function crearBarbero() {
  var crearBarberosHTML = '<h1 style="font-size: 16px;">Barberos</h1>' +
                          '<button onclick="listarBarberos()">Listar</button>' +
                          '<button onclick="crearBarbero()">Crear</button>' +
                          '<button onclick="buscarBarberodni()">Gestionar</button>' +
                          '<div class="formulario-crear">' +
                            '<h1 class="titulo-crear">Crear Barbero </h1>' +
                            '<form id="formularioCrear">' +
                              '<label for="dni">DNI:</label>' +
                              '<input type="text" id="dni" name="dni" pattern="[0-9]*" inputmode="numeric" required><br>' +
                              '<label for="nombre">Nombre:</label>' +
                              '<input type="text" id="nombre" name="nombre" required><br>' +
                              '<label for="apellido">Apellido:</label>' +
                              '<input type="text" id="apellido" name="apellido" required><br>' +
                              '<label for="nro_telefono">Telefono:</label>' +
                              '<input type="text" id="nro_telefono" name="nro_telefono" required><br>' +
                              '<label for="mail">Correo electronico:</label>' +
                              '<input type="email" id="mail" name="mail" required><br>' +
                              '<button onclick="guardarBarbero()">Guardar</button>' +
                            '</form>' +
                          '</div>';

   var contenidoBarberos = document.getElementById('Barberos');
    contenidoBarberos.innerHTML = crearBarberosHTML;
}

function mostrarMensajeError(mensaje) {
  var mensajeError = document.createElement('div');
  mensajeError.textContent = mensaje;
  mensajeError.style.color = 'red';
  document.getElementById('formularioCrear').appendChild(mensajeError);

  // un tiempo y l msj desaparece
  setTimeout(function() {
    mensajeError.parentNode.removeChild(mensajeError);
  }, 5000);
}


function guardarBarbero() {
  event.preventDefault();

  var dni = document.getElementById('dni').value;
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var nro_telefono = document.getElementById('nro_telefono').value;
  var mail = document.getElementById('mail').value;

  //dni numerico
  if (isNaN(parseInt(dni))) {
    mostrarMensajeError('El DNI debe ser numerico.');
    return;
  }

  //validacion campos completos
  if (!dni || !nombre || !apellido || !nro_telefono || !mail) {
    mostrarMensajeError('Todos los campos son obligatorios.');
    return;
  }

  var nuevoBarbero = {
    dni: parseInt(dni),
    nombre: nombre,
    apellido: apellido,
    nro_telefono: nro_telefono,
    mail: mail
  };

  fetch('http://localhost:8080/barbero/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoBarbero)
  })
  .then(response => response.json())
  .then(data => {
    var mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Barbero creado exitosamente.';
        mensajeExito.style.color = 'green';
        var formulario = document.getElementById('formularioCrear');
        formulario.appendChild(mensajeExito);
        setTimeout(function() {
            mensajeExito.parentNode.removeChild(mensajeExito);
          }, 5000);

        // Limpia los campos
        document.getElementById('dni').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('nro_telefono').value = '';
        document.getElementById('mail').value = '';
      })
  .catch(error => {
    mostrarMensajeError('Error al guardar el barbero.');
  });
}


//BUSCAR POR DNI, EDITARLO Y BORRAR

function buscarBarberodni() {
    var buscarBarberodniHTML =
        '<h1 style="font-size: 16px;">Barberos</h1>' +
        '<button onclick="listarBarberos()">Listar</button>' +
        '<button onclick="crearBarbero()">Crear</button>' +
        '<button onclick="buscarBarberodni()">Gestionar</button>' +
        '<div class="formulario-buscar">' +
        '<h1 class="titulo-buscar">Gestion de barberos</h1>' +
        '<form id="formularioBuscar">' +
        '<label for="dni">DNI:</label>' +
        '<input type="text" id="dni" name="dni" pattern="[0-9]*" inputmode="numeric" required style="margin-left: 10px;"><br>' +
        '<button type="button" onclick="buscarBtnBarbero()">Buscar</button>' +
        '</form>' +
        '<div id="resultadoBusqueda"></div>' +
        '</div>';

    var contenidoBarberos = document.getElementById('Barberos');
    contenidoBarberos.innerHTML = buscarBarberodniHTML;
}

function buscarBtnBarbero() {

    var dniInput = document.getElementById('dni');

    var dni = dniInput.value;

    if (!dni) {
            alert('Por favor, ingresa un numero de DNI antes de buscar.');
            return;
        }
    else if (dni) {
        fetch(`http://localhost:8080/barbero/obtenerDNI/${dni}`)
            .then(response => response.json())
            .then(data => {
                var resultadoBusqueda = document.getElementById('resultadoBusqueda');

                if (data) {
                    var resultHtml = '<h2>Resultado de la busqueda:</h2>';
                                      resultHtml += `<label>ID:</label> <input type="text" id="idInput" value="${data.id}" disabled><br>`;
                                      resultHtml += `<label>DNI:</label> <input type="text" id="dniInput" value="${data.dni}" disabled><br>`;
                                      resultHtml += `<label>Nombre:</label> <input type="text" id="nombreInput" value="${data.nombre}" disabled><br>`;
                                      resultHtml += `<label>Apellido:</label> <input type="text" id="apellidoInput" value="${data.apellido}" disabled><br>`;
                                      resultHtml += `<label>Telefono:</label> <input type="text" id="nro_telefonoInput" value="${data.nro_telefono}" disabled><br>`;
                                      resultHtml += `<label>Correo Electronico:</label> <input type="text" id="mailInput" value="${data.mail}" disabled><br>`;
                                      resultHtml += `<button class="guardar-button" onclick="guardarCambiosBarbero('${data.id}')" style="background-color: #BFE3E3; border-radius:5px; display: none; margin-left: 500px;">Guardar Cambios</button>`;
                                      resultHtml += `<button class="editar-button" onclick="habilitarEdicionBarbero()" style="background-color: #BFE3E3;">Editar</button>`;
                                      resultHtml += `<button class="eliminar-button" onclick="eliminarBarbero('${data.id}')" style="background-color: #BFE3E3;">Eliminar</button>`;


                    resultadoBusqueda.innerHTML = resultHtml;
                } else {
                    resultadoBusqueda.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al buscar por DNI:', error);
            });
    }

}

//Se usa en barberos y clientes igual
function habilitarEdicionBarbero() {
    var nombreInput = document.getElementById('nombreInput');
    var apellidoInput = document.getElementById('apellidoInput');
    var telefonoInput = document.getElementById('nro_telefonoInput');
    var correoInput = document.getElementById('mailInput');
    var guardarButton = document.querySelector('.guardar-button');

    nombreInput.disabled = false;
    apellidoInput.disabled = false;
    telefonoInput.disabled = false;
    correoInput.disabled = false;
    guardarButton.style.display = 'block';
}

function guardarCambiosBarbero(id) {

    // Obtener el valor del campo de entrada del ID
    var idInputValue = document.getElementById('idInput').value;
    var dni = document.getElementById('dniInput').value;
    var nombre = document.getElementById('nombreInput').value;
    var apellido = document.getElementById('apellidoInput').value;
    var nro_telefono = document.getElementById('nro_telefonoInput').value;
    var mail = document.getElementById('mailInput').value;

    var data = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        nro_telefono: nro_telefono,
        mail: mail
    };

    fetch(`http://localhost:8080/barbero/actualizar/${encodeURIComponent(idInputValue)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedData => {
        // Actualizar la vista con los nuevos datos
        document.getElementById('nombreInput').value = updatedData.nombre;
        document.getElementById('apellidoInput').value = updatedData.apellido;
        document.getElementById('nro_telefonoInput').value = updatedData.nro_telefono;
        document.getElementById('mailInput').value = updatedData.mail;

        // Deshabilitar los campos y ocultar el botón de "Guardar Cambios"
        document.getElementById('nombreInput').disabled = true;
        document.getElementById('apellidoInput').disabled = true;
        document.getElementById('nro_telefonoInput').disabled = true;
        document.getElementById('mailInput').disabled = true;
        document.querySelector('.guardar-button').style.display = 'none';

        var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Barbero actualizado correctamente';
                mensajeExito.style.color = 'green';

                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                                  }, 5000);
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
    });
}

function eliminarBarbero(id) {
    var confirmacion = confirm('Confirmar eliminacion');

    if (confirmacion) {
        fetch(`http://localhost:8080/barbero/eliminar/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Barbero eliminado correctamente';
                mensajeExito.style.color = 'green';
                                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                  }, 5000);

                document.getElementById('idInput').value = '';
                document.getElementById('dniInput').value = '';
                document.getElementById('nombreInput').value = '';
                document.getElementById('apellidoInput').value = '';
                document.getElementById('nro_telefonoInput').value = '';
                document.getElementById('mailInput').value = '';
            } else {
                // Error al eliminar
                console.error('Error al eliminar el barbero:', response.statusText);
                alert('Error al eliminar el barbero.');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el barbero:', error);
            alert('Error al eliminar el barbero.');
        });
    }
}


/* ACA TERMINAN LAS FUNCIONES DEDICADAS AL BARBERO*/





/*CLIENTES*/

/*LISTAR*/

function mostrarBotonesClientes() {
  var botonesClientes = document.querySelector("#Clientes").querySelectorAll("button");
  for (var j = 0; j < botonesClientes.length; j++) {
    botonesClientes[j].style.display = "inline-block";
  }
}

function listarClientes() {
  fetch('http://localhost:8080/cliente/obtener')
    .then(response => response.json())
    .then(data => {
      mostrarListaClientes(data);

    })
    .catch(error => {
      console.error('Error al obtener la lista de Clientes:', error);
    });
}

function mostrarListaClientes(clientes) {
  var listaClientesHTML = '<h1 style="font-size: 16px;">Clientes</h1>' +
                          '<button onclick="listarClientes()">Listar</button>' +
                          '<button onclick="crearCliente()">Crear</button>' +
                          '<button onclick="buscarClientedni()">Gestionar</button>' +
                          '<div id="tituloBarberos">Lista de Clientes</div>' +
                          '<ul class="lista-barberos">';

  for (var i = 0; i < clientes.length; i++) {
    listaClientesHTML += '<li>' +
                         '<strong>DNI: </strong>' + clientes[i].dni + '<br>' +
                         '<strong>Nombre: </strong>' + clientes[i].nombre + '<br>' +
                         '<strong>Apellido: </strong>' + clientes[i].apellido + '<br>' +
                         '<strong>Telefono: </strong>' + clientes[i].nro_telefono + '<br>' +
                         '<strong>Correo electronico: </strong>' + clientes[i].mail +
                         '</li>';
  }
  listaClientesHTML += '</ul>';

  var contenidoClientes = document.getElementById('Clientes');
  contenidoClientes.innerHTML = listaClientesHTML;
}

//CREACION DE CLIENTE
function crearCliente() {
  var crearClienteHTML = '<h1 style="font-size: 16px;">Clientes</h1>' +
                          '<button onclick="listarClientes()">Listar</button>' +
                          '<button onclick="crearCliente()">Crear</button>' +
                          '<button onclick="buscarClientedni()">Gestionar</button>' +
                          '<div class="formulario-crear">' +
                            '<h1 class="titulo-crear">Crear Cliente </h1>' +
                            '<form id="formularioCrear">' +
                              '<label for="dni">DNI:</label>' +
                              '<input type="text" id="dni" name="dni" pattern="[0-9]*" inputmode="numeric" required><br>' +
                              '<label for="nombre">Nombre:</label>' +
                              '<input type="text" id="nombre" name="nombre" required><br>' +
                              '<label for="apellido">Apellido:</label>' +
                              '<input type="text" id="apellido" name="apellido" required><br>' +
                              '<label for="nro_telefono">Telefono:</label>' +
                              '<input type="text" id="nro_telefono" name="nro_telefono" required><br>' +
                              '<label for="mail">Correo electronico:</label>' +
                              '<input type="email" id="mail" name="mail" required><br>' +
                              '<button onclick="guardarCliente()">Guardar</button>' +
                            '</form>' +
                          '</div>';

   var contenidoClientes = document.getElementById('Clientes');
    contenidoClientes.innerHTML = crearClienteHTML;
}

function mostrarMensajeError(mensaje) {
  var mensajeError = document.createElement('div');
  mensajeError.textContent = mensaje;
  mensajeError.style.color = 'red';
  document.getElementById('formularioCrear').appendChild(mensajeError);

  // un tiempo y l msj desaparece
  setTimeout(function() {
    mensajeError.parentNode.removeChild(mensajeError);
  }, 5000);
}

function guardarCliente() {
  event.preventDefault();

  var dni = document.getElementById('dni').value;
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var nro_telefono = document.getElementById('nro_telefono').value;
  var mail = document.getElementById('mail').value;

  //dni numerico
  if (isNaN(parseInt(dni))) {
    mostrarMensajeError('El DNI debe ser numerico.');
    return;
  }

  //validacion campos completos
  if (!dni || !nombre || !apellido || !nro_telefono || !mail) {
    mostrarMensajeError('Todos los campos son obligatorios.');
    return;
  }

  var nuevoCliente = {
    dni: parseInt(dni),
    nombre: nombre,
    apellido: apellido,
    nro_telefono: nro_telefono,
    mail: mail
  };

  fetch('http://localhost:8080/cliente/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoCliente)
  })
  .then(response => response.json())
  .then(data => {
    var mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Cliente creado exitosamente.';
        mensajeExito.style.color = 'green';
        var formulario = document.getElementById('formularioCrear');
        formulario.appendChild(mensajeExito);
        setTimeout(function() {
            mensajeExito.parentNode.removeChild(mensajeExito);
          }, 5000);

        // Limpia los campos
        document.getElementById('dni').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('nro_telefono').value = '';
        document.getElementById('mail').value = '';
      })
  .catch(error => {
    mostrarMensajeError('Error al guardar el cliente.');
  });
}

//BUSCAR POR DNI, EDITARLO Y BORRAR

function buscarClientedni() {
    var buscarClientedniHTML =
        '<h1 style="font-size: 16px;">Clientes</h1>' +
        '<button onclick="listarClientes()">Listar</button>' +
        '<button onclick="crearCliente()">Crear</button>' +
        '<button onclick="buscarClientedni()">Gestionar</button>' +
        '<div class="formulario-buscar">' +
        '<h1 class="titulo-buscar">Gestion de Clientes</h1>' +
        '<form id="formularioBuscar">' +
        '<label for="dni">DNI:</label>' +
        '<input type="text" id="dni" name="dni" pattern="[0-9]*" inputmode="numeric" required style="margin-left: 10px;"><br>' +
        '<button type="button" onclick="buscarCliente()">Buscar</button>' +
        '</form>' +
        '<div id="resultadoBusqueda"></div>' +
        '</div>';

    var contenidoClientes = document.getElementById('Clientes');
    contenidoClientes.innerHTML = buscarClientedniHTML;
}

function buscarCliente() {
    var dniInput = document.getElementById('dni');
    var dni = dniInput.value;

    if (!dni) {
            alert('Por favor, ingresa un numero de DNI antes de buscar.');
            return;
        }
    else if (dni) {
        fetch(`http://localhost:8080/cliente/obtenerDNI/${dni}`)
            .then(response => response.json())
            .then(data => {
                var resultadoBusqueda = document.getElementById('resultadoBusqueda');

                if (data) {
                    var resultHtml = '<h2>Resultado de la busqueda:</h2>';
                                      resultHtml += `<label>ID:</label> <input type="text" id="idInput" value="${data.id}" disabled><br>`;
                                      resultHtml += `<label>DNI:</label> <input type="text" id="dniInput" value="${data.dni}" disabled><br>`;
                                      resultHtml += `<label>Nombre:</label> <input type="text" id="nombreInput" value="${data.nombre}" disabled><br>`;
                                      resultHtml += `<label>Apellido:</label> <input type="text" id="apellidoInput" value="${data.apellido}" disabled><br>`;
                                      resultHtml += `<label>Telefono:</label> <input type="text" id="nro_telefonoInput" value="${data.nro_telefono}" disabled><br>`;
                                      resultHtml += `<label>Correo Electronico:</label> <input type="text" id="mailInput" value="${data.mail}" disabled><br>`;
                                      resultHtml += `<button class="guardar-button" onclick="guardarCambiosCliente('${data.id}')" style="background-color: #BFE3E3; border-radius:5px; display: none; margin-left: 500px;">Guardar Cambios</button>`;
                                      resultHtml += `<button class="editar-button" onclick="habilitarEdicionBarbero()" style="background-color: #BFE3E3;">Editar</button>`;
                                      resultHtml += `<button class="eliminar-button" onclick="eliminarCliente('${data.id}')" style="background-color: #BFE3E3;">Eliminar</button>`;


                    resultadoBusqueda.innerHTML = resultHtml;
                } else {
                    resultadoBusqueda.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al buscar por DNI:', error);
            });
    }
}

function guardarCambiosCliente(id) {

    // Obtener el valor del campo de entrada del ID
    var idInputValue = document.getElementById('idInput').value;
    var dni = document.getElementById('dniInput').value;
    var nombre = document.getElementById('nombreInput').value;
    var apellido = document.getElementById('apellidoInput').value;
    var nro_telefono = document.getElementById('nro_telefonoInput').value;
    var mail = document.getElementById('mailInput').value;

    var data = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        nro_telefono: nro_telefono,
        mail: mail
    };

    fetch(`http://localhost:8080/cliente/actualizar/${encodeURIComponent(idInputValue)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedData => {
        // Actualizar la vista con los nuevos datos
        document.getElementById('nombreInput').value = updatedData.nombre;
        document.getElementById('apellidoInput').value = updatedData.apellido;
        document.getElementById('nro_telefonoInput').value = updatedData.nro_telefono;
        document.getElementById('mailInput').value = updatedData.mail;

        // Deshabilitar los campos y ocultar el botón de "Guardar Cambios"
        document.getElementById('nombreInput').disabled = true;
        document.getElementById('apellidoInput').disabled = true;
        document.getElementById('nro_telefonoInput').disabled = true;
        document.getElementById('mailInput').disabled = true;
        document.querySelector('.guardar-button').style.display = 'none';

        var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Cliente actualizado correctamente';
                mensajeExito.style.color = 'green';

                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                                  }, 5000);
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
    });
}

function eliminarCliente(id) {
    var confirmacion = confirm('Confirmar eliminacion');

    if (confirmacion) {
        fetch(`http://localhost:8080/cliente/eliminar/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Cliente eliminado correctamente';
                mensajeExito.style.color = 'green';
                                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                  }, 5000);

                document.getElementById('idInput').value = '';
                document.getElementById('dniInput').value = '';
                document.getElementById('nombreInput').value = '';
                document.getElementById('apellidoInput').value = '';
                document.getElementById('nro_telefonoInput').value = '';
                document.getElementById('mailInput').value = '';
            } else {
                // Error al eliminar
                alert('Error al eliminar el cliente.');
            }
        })
        .catch(error => {
            alert('Error al eliminar el cliente.');
        });
    }
}


/* ACA TERMINAN LAS FUNCIONES DEDICADAS AL CLIENTE*/




/*SUCURSALES*/
function mostrarBotonesSucursales() {
  var botonesSucursales = document.querySelector("#Sucursales").querySelectorAll("button");
  for (var j = 0; j < botonesSucursales.length; j++) {
    botonesSucursales[j].style.display = "inline-block";
  }
}

function listarSucursales() {
  fetch('http://localhost:8080/local/obtener')
    .then(response => response.json())
    .then(data => {
      mostrarListaSucursales(data);

    })
    .catch(error => {
      console.error('Error al obtener la lista de sucursales:', error);
    });
}

function mostrarListaSucursales(sucursales) {
  var listaSucursalesHTML = '<h1 style="font-size: 16px;">Sucursales</h1>' +
                          '<button onclick="listarSucursales()">Listar</button>' +
                          '<button onclick="crearSucursal()">Crear</button>' +
                          '<button onclick="buscarSucursalNro()">Gestionar</button>' +
                          '<div id="tituloBarberos">Lista de Sucursales</div>' +
                          '<ul class="lista-barberos">';

  for (var i = 0; i < sucursales.length; i++) {
    listaSucursalesHTML += '<li>' +
                         '<strong>Numero de sucursal: </strong>' + sucursales[i].nrosucursal + '<br>' +
                         '<strong>Calle: </strong>' + sucursales[i].calle + '<br>' +
                         '<strong>Numero: </strong>' + sucursales[i].numero + '<br>' +
                         '<strong>Localidad: </strong>' + sucursales[i].localidad + '<br>' +
                         '</li>';
  }
  listaSucursalesHTML += '</ul>';

  var contenidoSucursales = document.getElementById('Sucursales');
  contenidoSucursales.innerHTML = listaSucursalesHTML;
}

//CREACION DE SUCURSAL

function crearSucursal() {
  var crearSucursalHTML = '<h1 style="font-size: 16px;">Sucursales</h1>' +
                          '<button onclick="listarSucursales()">Listar</button>' +
                          '<button onclick="crearSucursal()">Crear</button>' +
                          '<button onclick="buscarSucursalNro()">Gestionar</button>' +
                          '<div class="formulario-crear">' +
                            '<h1 class="titulo-crear">Crear sucursal </h1>' +
                            '<form id="formularioCrear">' +
                              '<label for="nrosucursal">Numero de sucursal:</label>' +
                              '<input type="text" id="nrosucursal" name="nrosucursal" pattern="[0-9]*" inputmode="numeric" required><br>' +
                              '<label for="calle">Calle:</label>' +
                              '<input type="text" id="calle" name="calle" required><br>' +
                              '<label for="numero">Numero:</label>' +
                              '<input type="text" id="numero" name="numero" required><br>' +
                              '<label for="localidad">Localidad:</label>' +
                              '<input type="text" id="localidad" name="localidad" required><br>' +
                              '<button onclick="guardarSucursal()">Guardar</button>' +
                            '</form>' +
                          '</div>';

   var contenidoSucursales = document.getElementById('Sucursales');
    contenidoSucursales.innerHTML = crearSucursalHTML;
}

function guardarSucursal() {
  event.preventDefault();

  var nrosucursal = document.getElementById('nrosucursal').value;
  var calle = document.getElementById('calle').value;
  var numero = document.getElementById('numero').value;
  var localidad = document.getElementById('localidad').value;

  //numero de sucursal numerico
  if (isNaN(parseInt(nrosucursal))) {
    mostrarMensajeError('El numero de sucursal debe ser numerico.');
    return;
  }

  //validacion campos completos
  if (!nrosucursal || !calle || !numero || !localidad) {
    mostrarMensajeError('Todos los campos son obligatorios.');
    return;
  }

  var nuevaSucursal = {
    nrosucursal: parseInt(nrosucursal),
    calle: calle,
    numero: numero,
    localidad: localidad,
  };

  fetch('http://localhost:8080/local/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevaSucursal)
  })
  .then(response => response.json())
  .then(data => {
    var mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Sucursal creada exitosamente.';
        mensajeExito.style.color = 'green';
        var formulario = document.getElementById('formularioCrear');
        formulario.appendChild(mensajeExito);
        setTimeout(function() {
            mensajeExito.parentNode.removeChild(mensajeExito);
          }, 5000);

        // Limpia los campos
        document.getElementById('nrosucursal').value = '';
        document.getElementById('calle').value = '';
        document.getElementById('numero').value = '';
        document.getElementById('localidad').value = '';
      })
  .catch(error => {
    mostrarMensajeError('Error al guardar la sucursal.');
  });
}

//BUSCAR SUCURSAL POR NUMERO DE SUCURSAL, EDITAR Y ELIMINAR
function buscarSucursalNro() {
    var buscarSucursalnroHTML =
        '<h1 style="font-size: 16px;">Sucursales</h1>' +
        '<button onclick="listarSucursales()">Listar</button>' +
        '<button onclick="crearSucursal()">Crear</button>' +
        '<button onclick="buscarSucursalNro()">Gestionar</button>' +
        '<div class="formulario-buscar">' +
        '<h1 class="titulo-buscar">Gestion de Sucursales</h1>' +
        '<form id="formularioBuscar">' +
        '<label for="nrosucursal">Numero de sucursal:</label>' +
        '<input type="text" id="nrosucursal" name="nrosucursal" pattern="[0-9]*" inputmode="numeric" required style="margin-left: 10px;"><br>' +
        '<button type="button" onclick="buscarSucursal()">Buscar</button>' +
        '</form>' +
        '<div id="resultadoBusqueda"></div>' +
        '</div>';

    var contenidoSucursales = document.getElementById('Sucursales');
    contenidoSucursales.innerHTML = buscarSucursalnroHTML;
}

function buscarSucursal() {
    var nrosucursalInput = document.getElementById('nrosucursal');
    var nrosucursal = nrosucursalInput.value;

    if (!nrosucursal) {
            alert('Por favor, ingresa un numero de numero de sucursal antes de buscar.');
            return;
        }
    else if (nrosucursal) {
        fetch(`http://localhost:8080/local/obtenerNRO/${nrosucursal}`)
            .then(response => response.json())
            .then(data => {
                var resultadoBusqueda = document.getElementById('resultadoBusqueda');

                if (data) {
                    var resultHtml = '<h2>Resultado de la busqueda:</h2>';
                                      resultHtml += `<label>ID:</label> <input type="text" id="idInput" value="${data.id}" disabled><br>`;
                                      resultHtml += `<label>Numero de sucursal:</label> <input type="text" id="nrosucursalInput" value="${data.nrosucursal}" disabled><br>`;
                                      resultHtml += `<label>Calle:</label> <input type="text" id="calleInput" value="${data.calle}" disabled><br>`;
                                      resultHtml += `<label>Numero:</label> <input type="text" id="numeroInput" value="${data.numero}" disabled><br>`;
                                      resultHtml += `<label>Localidad:</label> <input type="text" id="localidadInput" value="${data.localidad}" disabled><br>`;
                                      resultHtml += `<button class="guardar-button" onclick="guardarCambiosSucursal('${data.id}')" style="background-color: #BFE3E3; border-radius:5px; display: none; margin-left: 500px;">Guardar Cambios</button>`;
                                      resultHtml += `<button class="editar-button" onclick="habilitarEdicionSuc()" style="background-color: #BFE3E3;">Editar</button>`;
                                      resultHtml += `<button class="eliminar-button" onclick="eliminarSucursal('${data.id}')" style="background-color: #BFE3E3;">Eliminar</button>`;


                    resultadoBusqueda.innerHTML = resultHtml;
                } else {
                    resultadoBusqueda.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al buscar por numero de sucursal:', error);
            });
    }
}

function habilitarEdicionSuc() {
    var calleInput = document.getElementById('calleInput');
    var numeroInput = document.getElementById('numeroInput');
    var localidadInput = document.getElementById('localidadInput');
    var guardarButton = document.querySelector('.guardar-button');

    calleInput.disabled = false;
    numeroInput.disabled = false;
    localidadInput.disabled = false;
    guardarButton.style.display = 'block';
}

function guardarCambiosSucursal(id) {

    // Obtener el valor del campo de entrada del ID
    var idInputValue = document.getElementById('idInput').value;
    var nrosucursalInputValue = document.getElementById('nrosucursalInput').value;
    var calle = document.getElementById('calleInput').value;
    var numero = document.getElementById('numeroInput').value;
    var localidad = document.getElementById('localidadInput').value;

    var data = {
        nrosucursal: nrosucursalInputValue,
        calle: calle,
        numero: numero,
        localidad: localidad,
    };

    fetch(`http://localhost:8080/local/actualizar/${encodeURIComponent(idInputValue)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedData => {
        // Actualizar la vista con los nuevos datos
        document.getElementById('calleInput').value = updatedData.calle;
        document.getElementById('numeroInput').value = updatedData.numero;
        document.getElementById('localidadInput').value = updatedData.localidad;

        // Deshabilitar los campos y ocultar el botón de "Guardar Cambios"
        document.getElementById('calleInput').disabled = true;
        document.getElementById('numeroInput').disabled = true;
        document.getElementById('localidadInput').disabled = true;
        document.querySelector('.guardar-button').style.display = 'none';

        var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Sucursal actualizada correctamente';
                mensajeExito.style.color = 'green';

                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                                  }, 5000);
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
    });
}

function eliminarSucursal(id) {
    var confirmacion = confirm('Confirmar eliminacion');

    if (confirmacion) {
        fetch(`http://localhost:8080/local/eliminar/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Sucursal eliminada correctamente';
                mensajeExito.style.color = 'green';
                                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                  }, 5000);

                document.getElementById('idInput').value = '';
                document.getElementById('nrosucursalInput').value = '';
                document.getElementById('calleInput').value = '';
                document.getElementById('numeroInput').value = '';
                document.getElementById('localidadInput').value = '';
            } else {
                // Error al eliminar
                alert('Error al eliminar la Sucursal.');
            }
        })
        .catch(error => {
            alert('Error al eliminar la Sucursal.');
        });
    }
}

/* ACA TERMINAN LAS FUNCIONES DEDICADAS A LA SUCURSAL*/



//TURNOS
function mostrarBotonesTurnos() {
  var botonesTurnos = document.querySelector("#Turnos").querySelectorAll("button");
  for (var j = 0; j < botonesTurnos.length; j++) {
    botonesTurnos[j].style.display = "inline-block";
  }
}

function listarTurnos() {
  fetch('http://localhost:8080/turno/obtener')
    .then(response => response.json())
    .then(data => {
      mostrarListaTurnos(data)
    })
    .catch(error => {
      console.error('Error al obtener la lista de Turnos:', error);
    });
}

function mostrarListaTurnos(turnos) {
  var listaTurnosHTML = '<h1 style="font-size: 16px;">Turnos</h1>' +
                          '<button onclick="listarTurnos()">Listar</button>' +
                          '<button onclick="crearTurno()">Crear</button>' +
                          '<button onclick="buscarTurnoID()">Gestionar</button>' +
                          '<div id="tituloBarberos">Lista de Turnos</div>' +
                          '<ul class="lista-barberos">';

  for (var i = 0; i < turnos.length; i++) {
      listaTurnosHTML += '<li>' +
                           '<h2>Detalles del Turno</h2>' +
                           '<strong>ID: </strong>' + turnos[i].id + '<br>' +
                           '<strong>Cliente: </strong>' + turnos[i].cliente.nombre + ' ' + turnos[i].cliente.apellido + '<br>' +
                           '<strong>Barbero: </strong>' + turnos[i].barbero.nombre + ' ' + turnos[i].barbero.apellido + '<br>' +
                           '<strong>Local: </strong>' + turnos[i].local.calle + ' ' + turnos[i].local.numero + '<br>' +
                           '<strong>Fecha: </strong>' + turnos[i].date + '<br>' +
                           '</li>';
    }
    listaTurnosHTML += '</ul>';

    var contenidoTurnos = document.getElementById('Turnos');
    contenidoTurnos.innerHTML = listaTurnosHTML;
  }


//CREACION DE TURNOS

const datosTurno = {
    cliente: {},
    barbero: {},
    local: {},
    date:{},
};

function crearTurno() {
  let crearTurnoHTML = '<div style="text-align: left !important;">' +
                          '<h1 style="font-size: 16px;">Turnos</h1>' +
                          '<button onclick="listarTurnos()">Listar</button>' +
                          '<button onclick="crearTurno()">Crear</button>' +
                          '<button onclick="buscarTurnoID()">Gestionar</button>' +
                          '<div style="text-align: left !important;" class="formulario-crear">' +
                            '<h1 class="titulo-crear">Crear Turno </h1>' +
                            '<form id="formularioCrear">' +
                              '<label for="cliente">DNI del cliente:</label>' +
                              '<input type="text" id="cliente" name="cliente" pattern="[0-9]*" inputmode="numeric" required><br> ' +
                              '<label for="barbero">DNI del barbero:</label>' +
                              '<input type="text" id="barbero" name="barbero" required><br>' +
                              '<label for="local">Numero de sucursal:</label>' +
                              '<input type="text" id="local" name="local" required><br>' +
                              '<label for="date">Fecha:</label>' +
                              '<input type="datetime-local" id="date" name="date" required><br>' +
                              '<button style="margin-bottom:5px;" type="button" onclick="buscarDatos()">Buscar</button>' +
                              '<button id="guardar-turno" type="button" onclick="guardarTurno()">Guardar</button>' +
                            '</form>' +
                          '</div>'+
                          '<div id="resultado"></div>' +
                        '</div>';

   let contenidoTurnos = document.getElementById('Turnos');
    contenidoTurnos.innerHTML = crearTurnoHTML;
}

function buscarDatos() {
    return new Promise(function(resolve, reject) {
    const dniCliente = document.getElementById('cliente').value;
    const dniBarbero = document.getElementById('barbero').value;
    const nroSucursal = document.getElementById('local').value;

    // Deshabilitar el botón Guardar durante la búsqueda
    document.getElementById('guardar-turno').disabled = true;

    // Realizar las solicitudes de búsqueda en paralelo usando Promise.all
    Promise.all([
        fetch(`http://localhost:8080/cliente/obtenerDNI/${dniCliente}`)
            .then(response => response.json())
            .then(data => {
                datosTurno.cliente = data;
                mostrarDatos('cliente', data);
            })
            .catch(error => {
                console.error('Error al buscar datos del cliente:', error);
            }),
        fetch(`http://localhost:8080/barbero/obtenerDNI/${dniBarbero}`)
            .then(response => response.json())
            .then(data => {
                datosTurno.barbero = data;
                mostrarDatos('barbero', data);
            })
            .catch(error => {
                console.error('Error al buscar datos del barbero:', error);
            }),
        fetch(`http://localhost:8080/local/obtenerNRO/${nroSucursal}`)
            .then(response => response.json())
            .then(data => {
                datosTurno.local = data;
                mostrarDatos('local', data);
            })
            .catch(error => {
                console.error('Error al buscar datos del local:', error);
            })
    ])
    .then(() => {
            // Habilitar el botón Guardar después de completar las búsquedas
            document.getElementById('guardar-turno').disabled = false;
        })
        .catch(error => {
            console.error('Error en alguna búsqueda:', error);
        });
        resolve();
    });
}

function guardarTurno() {
    buscarDatos()
        .then(function() {
             let selectedDateTime = new Date(document.getElementById('date').value);
             let adjustedDateTime = new Date(selectedDateTime.getTime() - (selectedDateTime.getTimezoneOffset() * 60000));
             let date = adjustedDateTime.toISOString().replace("Z", "");

             console.log(date);

            const turno = {
                cliente: datosTurno.cliente,
                barbero: datosTurno.barbero,
                local: datosTurno.local,
                date: date,
            };

    // Realizar la solicitud para guardar el turno
            fetch('http://localhost:8080/turno/guardar', {
                method: 'POST', // Método HTTP para enviar los datos
                headers: {
                 'Content-Type': 'application/json' // Tipo de contenido JSON
            },
            body: JSON.stringify(turno) // Convertir el objeto en formato JSON
            })
            .then(response => response.json())
            .then(data => {
                var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Turno creado exitosamente.';
                mensajeExito.style.color = 'green';
                var formulario = document.getElementById('formularioCrear');
                formulario.appendChild(mensajeExito);
                setTimeout(function() {
                mensajeExito.parentNode.removeChild(mensajeExito);
                }, 5000);

        // Limpia los campos
                document.getElementById('cliente').value = '';
                document.getElementById('barbero').value = '';
                document.getElementById('local').value = '';
                document.getElementById('date').value = '';
            })
        .catch(error => {
        console.error('Error al guardar el turno:', error);
        });
        });
}

function mostrarDatos(tipo, data) {
    const resultadoDiv = document.getElementById('resultado');
    let contenido = `<h2>${tipo} encontrado</h2>`;

    if (tipo === 'cliente') {
        contenido += `
            <p><strong>DNI: </strong>${data.dni}</p>
            <p><strong>Nombre: </strong>${data.nombre}</p>
            <p><strong>Apellido: </strong>${data.apellido}</p>
            <p><strong>Numero de telefono: </strong>${data.nro_telefono}</p>
            <p><strong>Mail: </strong>${data.mail}</p>
        `;
    } else if (tipo === 'barbero') {
        contenido += `
            <p><strong>DNI: </strong>${data.dni}</p>
            <p><strong>Nombre: </strong>${data.nombre}</p>
            <p><strong>Apellido: </strong>${data.apellido}</p>
            <p><strong>Numero de telefono: </strong>${data.nro_telefono}</p>
            <p><strong>Mail: </strong>${data.mail}</p>
        `;
    } else if (tipo === 'local') {
        contenido += `
            <p><strong>Numero de Sucursal: </strong>${data.nrosucursal}</p>
            <p><strong>Calle: </strong>${data.calle}</p>
            <p><strong>Numero: </strong>${data.numero}</p>
            <p><strong>Localidad: </strong>${data.localidad}</p>
        `;
    }

    resultadoDiv.innerHTML += contenido;
}

//EDITAR DATOS Y ELIMINAR
function buscarTurnoID() {
    var buscarTurnoIDHTML =
        '<h1 style="font-size: 16px;">Turnos</h1>' +
        '<button onclick="listarTurnos()">Listar</button>' +
        '<button onclick="crearTurno()">Crear</button>' +
        '<button onclick="buscarTurnoID()">Gestionar</button>' +
        '<div class="formulario-buscar">' +
        '<h1 class="titulo-buscar">Gestion de Turnos</h1>' +
        '<form id="formularioBuscar">' +
        '<label for="id">ID de turno:</label>' +
        '<input type="text" id="id" name="id" required style="margin-left: 10px;"><br>' +
        '<button type="button" onclick="buscarTurno()">Buscar</button>' +
        '</form>' +
        '<div id="resultadoBusqueda"></div>' +
        '</div>';

    var contenidoTurnos = document.getElementById('Turnos');
    contenidoTurnos.innerHTML = buscarTurnoIDHTML;
}

function buscarTurno() {
    var IDInput = document.getElementById('id');
    var id = IDInput.value;

    if (!id) {
        alert('Por favor, ingresa una ID antes de buscar.');
        return;
    } else if (id) {
        fetch(`http://localhost:8080/turno/obtenerID/${id}`)
            .then(response => response.json())
            .then(data => {
                var resultadoBusqueda = document.getElementById('resultadoBusqueda');

                if (data) {
                    var resultHtml = '<h2>Resultado de la busqueda:</h2>';
                    resultHtml += `<label>ID:</label> <input type="text" id="idInput" value="${data.id}" disabled><br>`;
                    resultHtml += `<label>Nombre del cliente:</label> <input type="text" id="nombreClienteInput" value="${data.cliente.nombre}" disabled><br>`;
                    resultHtml += `<label>Apellido del cliente:</label> <input type="text" id="apellidoClienteInput" value="${data.cliente.apellido}" disabled><br>`;
                    resultHtml += `<label>Nombre del barbero:</label> <input type="text" id="nombreBarberoInput" value="${data.barbero.nombre}" disabled><br>`;
                    resultHtml += `<label>Apellido del barbero:</label> <input type="text" id="apellidoBarberoInput" value="${data.barbero.apellido}" disabled><br>`;
                    resultHtml += `<label>Calle del local:</label> <input type="text" id="calleLocalInput" value="${data.local.calle}" disabled><br>`;
                    resultHtml += `<label>Numero del local:</label> <input type="text" id="numeroLocalInput" value="${data.local.numero}" disabled><br>`;
                    resultHtml += `<label>Fecha:</label> <input type="datetime-local" id="fechaInput" value="${data.date}" disabled><br>`;
                    resultHtml += `<button class="guardar-button" onclick="guardarCambiosTurno('${data.id}')" style="background-color: #BFE3E3; border-radius:5px; display: none; margin-left: 500px;">Guardar Cambios</button>`;
                    resultHtml += `<button class="editar-button" onclick="habilitarEdicionTur()" style="background-color: #BFE3E3;">Editar</button>`;
                    resultHtml += `<button class="eliminar-button" onclick="eliminarTurno('${data.id}')" style="background-color: #BFE3E3;">Eliminar</button>`;

                    resultadoBusqueda.innerHTML = resultHtml;
                } else {
                    resultadoBusqueda.innerHTML = '<p>No se encontraron resultados.</p>';
                }
            })
            .catch(error => {
                console.error('Error al buscar por ID:', error);
            });
    }
}

function habilitarEdicionTur() {
    var fechaInput = document.getElementById('fechaInput');
    var guardarButton = document.querySelector('.guardar-button'); // Agrega esta línea

    fechaInput.disabled = false;
    guardarButton.style.display = 'block';
}

function guardarCambiosTurno(id) {
    let selectedDateTime = new Date(document.getElementById('fechaInput').value);
    let adjustedDateTime = new Date(selectedDateTime.getTime() - (selectedDateTime.getTimezoneOffset() * 60000));
    let datef = adjustedDateTime.toISOString().replace("Z", "");

    var data = {
        date: datef
    };

    fetch(`http://localhost:8080/turno/actualizar/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedData => {
        // Actualizar la vista con la nueva fecha
        //let selectedDateTime = new Date(document.getElementById('date').value);
        //let adjustedDateTime = new Date(selectedDateTime.getTime() - (selectedDateTime.getTimezoneOffset() * 60000));
        //let date = adjustedDateTime.toISOString().replace("Z", "");
        console.log(datef)
                // Actualizar la vista con la nueva fecha formateada
         document.getElementById('fechaInput').value = datef;

        // Deshabilitar el campo de fecha y ocultar el botón de "Guardar Cambios"
        document.getElementById('fechaInput').disabled = true;
        document.querySelector('.guardar-button').style.display = 'none';

        var mensajeExito = document.createElement('div');
        mensajeExito.textContent = 'Fecha de turno actualizada correctamente';
        mensajeExito.style.color = 'green';

        // Insertar el mensaje de éxito antes del botón de "Editar"
        var editarButton = document.querySelector('.editar-button');
        editarButton.parentNode.insertBefore(mensajeExito, editarButton);
        setTimeout(function() {
            mensajeExito.parentNode.removeChild(mensajeExito);
        }, 5000);
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
    });
}

function eliminarTurno(id) {
    var confirmacion = confirm('Confirmar eliminacion');

    if (confirmacion) {
        fetch(`http://localhost:8080/turno/eliminar/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                var mensajeExito = document.createElement('div');
                mensajeExito.textContent = 'Turno eliminado correctamente';
                mensajeExito.style.color = 'green';
                                // Insertar el mensaje de éxito antes del botón de "Editar"
                var editarButton = document.querySelector('.editar-button');
                editarButton.parentNode.insertBefore(mensajeExito, editarButton);
                setTimeout(function() {
                    mensajeExito.parentNode.removeChild(mensajeExito);
                  }, 5000);

                document.getElementById('idInput').value = '';
                document.getElementById('nombreClienteInput').value = '';
                document.getElementById('apellidoClienteInput').value = '';
                document.getElementById('nombreBarberoInput').value = '';
                document.getElementById('apellidoBarberoInput').value = '';
                document.getElementById('calleLocalInput').value = '';
                document.getElementById('numeroLocalInput').value = '';
                document.getElementById('fechaInput').value = '';
            } else {
                // Error al eliminar
                alert('Error al eliminar el turno.');
            }
        })
        .catch(error => {
            alert('Error al eliminar el turno.');
        });
    }
}
