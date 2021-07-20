import { EmpleadoServicio} from "./EmpleadoServicio";
import * as SignalR from '@microsoft/signalr';
import { Empleado } from "./Empleado";
import Swal from "sweetalert2";

const _conexionHub = new SignalR.HubConnectionBuilder()
.withUrl('/hubEmpleado').build();

_conexionHub.start()
.then(() => console.log('conectado...'))
.catch(er => console.error(er));

_conexionHub.on('informar', (mensaje : string) => {
    alert(`Ups... alguien escribio: ${mensaje}`)
});

_conexionHub.on('nuevoEmpleado', (empleado : Empleado) => {
    NotificarNuevoEmpleado();
    ActualizarTablaSocket(empleado);
});

_conexionHub.on('modificarEmpleado', (operacion : boolean) => {
    if (operacion) {
        ActualizarTablaEmpleados();
    }
});

const _empleadoServicio : EmpleadoServicio = new EmpleadoServicio();
let _empleado : Empleado = new Empleado();

document.addEventListener('DOMContentLoaded', async() => {
    await ActualizarTablaEmpleados();
});

document.querySelector('.informar').addEventListener('click', () => {

    let mensaje : string = 'Hola, informar a todos...';

    _conexionHub.invoke('informar', mensaje)
    .catch(er => console.log(er));
});

document.querySelector('.agregarEmpleado').addEventListener('click', () => {

    try {
        let legajo = (document.getElementById('Legajo') as HTMLInputElement).value;
        let nombre = (document.getElementById('Nombre') as HTMLInputElement).value;
        let apellido = (document.getElementById('Apellido') as HTMLInputElement).value;
        let dni = (document.getElementById('Dni') as HTMLInputElement).value;

        let objEmpleado = new Empleado(parseInt(legajo), nombre, apellido, dni);

        _conexionHub.invoke('nuevoEmpleado', objEmpleado)
            .catch(er => console.log(`Error al agregar empleado: ${er}`));

        Swal.fire({
            icon:'success',
            title:'Registro Exitoso',
            text:'El empleado fue agregado exitosamente'
        });
    }
    catch
    {
        Swal.fire({
            title:'Error al agregar',
            text:'Ocurrio un error al agregar al empleado...',
            icon:'error'
        });
    }
});

// Evento al dar click al actualizar en el modal
document.querySelector('.btnModificarEmpleado').addEventListener('click', () => {
    ModificarEmpleado();
});

async function ActualizarTablaEmpleados()
{
    let empleados = await _empleadoServicio.ListadoEmpleados();

    const tabla = document.querySelector('.tabla-empleados') as HTMLTableElement;
    tabla.innerHTML = '';

    empleados.forEach((empleado) => {
        let row = tabla.insertRow();

        let btnModificar = document.createElement('button');
        btnModificar.classList.add('btn', 'btn-primary');
        btnModificar.textContent = 'Modificar';
        btnModificar.dataset.toggle = 'modal';
        btnModificar.dataset.target = '#modalModificarEmpleado';
        btnModificar.onclick = () => {
            CargarDatosEmpleado(empleado);
        }

        row.innerHTML = `
        <td>${empleado.legajo}</td>
        <td>${empleado.apyNom}</td>
        <td>${empleado.dni}</td>
        <td></td>
        `

        row.children[3].appendChild(btnModificar);

        // Asignamos el empleado seleccionado a nuestra variable privada
        //_empleado = empleado;
    });
}

 const NotificarNuevoEmpleado = () => {
    const notificacion = document.getElementById('notificacion');

    notificacion.innerHTML = '<strong>Atención!</strong> <p>Se agrego un nuevo empleado.</p>';

    notificacion.style.display = 'block';

    let timeOut = setTimeout(() => {
        notificacion.innerHTML = '';
        notificacion.style.display = 'none';

        clearTimeout(timeOut);
    }, 3000);
}

const ActualizarTablaSocket = (empleado : Empleado) => {
    
    const tabla = document.querySelector('.tabla-empleados') as HTMLTableElement;

    const btnModificar = document.createElement('button');
    btnModificar.classList.add('btn', 'btn-primary');
    btnModificar.textContent = 'Modificar';
    btnModificar.dataset.toggle = 'modal';
    btnModificar.dataset.target = '#modalModificarEmpleado';
    btnModificar.onclick = () => {
        CargarDatosEmpleado(empleado);
    }
    
    let row = tabla.insertRow();

    row.innerHTML = `
    <td>${empleado.legajo}</td>
    <td>${empleado.apyNom}</td>
    <td>${empleado.dni}</td>
    <td></td>
    `

    row.children[3].appendChild(btnModificar);

    //
    _empleado = empleado;
};

const CargarDatosEmpleado = (empleado : Empleado) =>
{
    const titulo = (document.getElementById('apyNom') as HTMLElement);
    const nombre = (document.getElementById('nuevoNombre') as HTMLInputElement);
    const apellido = (document.getElementById('nuevoApellido') as HTMLInputElement);
    const dni = (document.getElementById('nuevoDni') as HTMLInputElement);

    titulo.textContent = empleado.apyNom;
    nombre.value = empleado.nombre;
    apellido.value = empleado.apellido;
    dni.value = empleado.dni;

    _empleado = empleado;
}

async function ModificarEmpleado()
{
    _empleado.nombre = (document.getElementById('nuevoNombre') as HTMLInputElement).value;
    _empleado.apellido = (document.getElementById('nuevoApellido') as HTMLInputElement).value;
    _empleado.dni = (document.getElementById('nuevoDni') as HTMLInputElement).value;

    _conexionHub.invoke('modificarEmpleado', _empleado)
    .catch(er => console.log(`Error al modificar ${er}`));
}