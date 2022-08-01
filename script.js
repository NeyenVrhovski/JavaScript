// Inicializo el array contenedor y creo la clase para meterle objetos

let cajaNotas = document.getElementById('cards-container');
let bottonEnviar = document.getElementById('agregar-alumno');
let inputNombre = document.getElementById('nombre');
let inputApellido = document.getElementById('apellido');
let inputDni = document.getElementById('dni');
let inputNota = document.getElementById('nota');
let bottonBorrar = document.getElementById('borrar-alumno');
let bottonPromedio = document.getElementById('ver-promedio');
let bottonBuscar = document.getElementById('buscar-alumno');

let contenedorNotas = [];
let jsonNotas;


class PerfilAlumno{
    constructor(nombre, apellido, dni, nota)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.nota = nota;
    };
};

const agregarAlumno = () =>  {
    // Con esta funcion, solicito los datos, creo un objeto nuevo y lo meto dentro del array
    nombre = inputNombre.value;
    apellido = inputApellido.value;
    dni = parseInt(inputDni.value);
    nota = parseInt(inputNota.value);
    {nombre == '' || apellido == '' || dni == '' || nota == '' 
    ?
    Swal.fire({
        title: 'Error!',
        text: 'Faltan campos por completar',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    })
    :
    contenedorNotas.push(new PerfilAlumno(nombre, apellido, dni, nota));
    jsonNotas = JSON.stringify(contenedorNotas);
    localStorage.setItem('contenedorNotas', jsonNotas);
    renderCards(contenedorNotas);}
}

const borrarAlumno = () => {
    // Si el array esta vacio retorno un error, y sino borro su ultima posicion
    contenedorNotas.length == 0 
    ?
    Swal.fire({
        title: 'Atención!',
        text: 'Aún no se han ingresado datos',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
    })
    :
    contenedorNotas.pop();
    jsonNotas = JSON.stringify(contenedorNotas);
    localStorage.setItem('contenedorNotas', jsonNotas);
    renderCards(contenedorNotas);
}

const sacarPromedio = () => {
    // Con el metodo "reduce" puedo sumar las propiedades "nota" de cada objeto en cada posicion del array, y luego lo divido por la cantidad de posiciones del mismo para sacar el promedio
    if(contenedorNotas.length == 0)
    {
        Swal.fire({
            title: 'Atención!',
            text: 'Aún no se han ingresado notas',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })
    }else{
        let sumaNotas = contenedorNotas.reduce((acc, el) => acc + el.nota, 0);
        let promedio = sumaNotas / contenedorNotas.length;
        Swal.fire({
            title: 'Promedio',
            text: 'El promedio de notas de los alumnos es ' + promedio,
            icon: 'info',
            confirmButtonText: 'Cerrar'
        })
    };
}

const buscarAlumno = () => {
    // Primero, si el metodo "find" me devuelve "undefined", es porque no hay un alumno con ese DNI por lo que tira error, y sino, capturo el objeto en el cual esta ese numero de DNI y lo muestro en la consola
    if(contenedorNotas.length == 0)
    {
        Swal.fire({
            title: 'Atención!',
            text: 'Aún no se han ingresado notas',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })
    }else{
        let dniBuscado = parseInt(prompt("Ingrese el DNI del alumno buscado"));
        if(contenedorNotas.find((el) => el.dni == dniBuscado) != undefined)
        {
            let alumnoBuscado = contenedorNotas.find((el) => el.dni == dniBuscado)
            Swal.fire({
                title: alumnoBuscado.apellido + ', ' + alumnoBuscado.nombre,
                text: 'DNI: ' + alumnoBuscado.dni + '\n Nota: ' + alumnoBuscado.nota,
                icon: 'info',
                confirmButtonText: 'Cerrar'
            })
        }else{
            cajaNotas.innerHTML = `<p>No se encontraron resultados</p>`;
        };
    };
}

// Recorro el array y por cada posicion, renderizo una carta con sus datos

const renderCards = (array) =>
{
    cajaNotas.innerHTML = ''
    array.forEach(e => 
        {
            if(e.nota >= 7)
            {
                cajaNotas.innerHTML += `<div class='card' style='width: 18rem;'>
                    <div class='card-header'>
                    ${e.nombre + ' ' + e.apellido}
                    </div>
                    <ul class='list-group list-group-flush'>
                    <li class='list-group-item'>DNI: ${e.dni}</li>
                    <li class='list-group-item nota-aprobada'>Nota: ${e.nota}</li>
                    </ul>
                </div>`
            }else
            {
                cajaNotas.innerHTML += `<div class='card' style='width: 18rem;'>
                <div class='card-header'>
                  ${e.nombre + ' ' + e.apellido}
                </div>
                <ul class='list-group list-group-flush'>
                  <li class='list-group-item'>DNI: ${e.dni}</li>
                  <li class='list-group-item nota-desaprobada'>Nota: ${e.nota}</li>
                </ul>
              </div>`
            }   
        })
}

// Al cargar la pagina, me traigo el array de alumnos del storage y renderizo las cards que hagan falta

const handleStorage = () => {
    jsonNotas = localStorage.getItem('contenedorNotas');
    jsonNotas == null ? contenedorNotas = [] : contenedorNotas = JSON.parse(jsonNotas);
    renderCards(contenedorNotas);
}

document.body.onload = handleStorage;
bottonEnviar.onclick = agregarAlumno;
bottonBuscar.onclick = buscarAlumno;
bottonPromedio.onclick = sacarPromedio;
bottonBorrar.onclick = borrarAlumno;

