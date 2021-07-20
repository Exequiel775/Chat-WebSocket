import * as SignalR from '@microsoft/signalr';
import { Usuario } from './Usuario';
import { ChatUsuarios } from './ChatUsuarios';

const _connection = new SignalR.HubConnectionBuilder().withUrl('/hub').build();

// INSTANCIAMOS LA CLASE USUARIO 
const _usuario : Usuario = new Usuario();

_connection.start()
.then(() => console.log('conectado...'))
.catch(() => console.log('error al conectar al hub...'));

_connection.on('conectado', (usuarios : string[]) => {
    //MostrarNotificacion(mensaje, Tipo.Conexion);
    ActualizarUsuarios(usuarios);
});

_connection.on('nuevoMensaje', (mensaje : string) => {
    NuevoMensaje(mensaje);
});

_connection.on('desconexion', (mensaje : string) => {
    //MostrarNotificacion(mensaje, Tipo.Desconexion);
});

(document.querySelector('.enviar') as HTMLButtonElement).addEventListener('click', () => {
    let mensaje = (document.getElementById('mensaje') as HTMLInputElement).value;

    _usuario.mensaje = mensaje;
    console.log(_usuario);

    EnviarMensaje(_usuario);
});

function MostrarNotificacion(cliente: string, tipo: Tipo) {

    let divAlerta = document.getElementById('alerta-conectado');

    let strMensaje = document.getElementById('id-cliente') as HTMLElement;

    if (tipo == Tipo.Conexion) {

        if (!divAlerta.classList.contains('alert-success')) {
            divAlerta.classList.remove('alert-danger');
            divAlerta.classList.add('alert-success');
        }

        strMensaje.textContent = `Bienvenido ${cliente}`;

        divAlerta.style.display = 'block';
    }

    if (tipo == Tipo.Desconexion)
    {
        strMensaje.textContent = `${cliente} se ah desconectado.`;

        if (!divAlerta.classList.contains('alert-danger')) {
            divAlerta.classList.remove('alert-success');
            divAlerta.classList.add('alert-danger');
        }

        divAlerta.style.display = 'block';
    }
}

function ActualizarUsuarios(usuarios : string[])
{
    const contenedor = document.querySelector('.contenedor');
    contenedor.innerHTML = '';

    usuarios.forEach((data) => {
        let columna = document.createElement('div');

        columna.classList.add('col-12', 'col-sm-12', 'col-md-3', 'col-lg-3', 'col-xl-3')

        let btnUsuario = document.createElement('button');
        btnUsuario.classList.add('btn', 'm-1', 'usuario');
        btnUsuario.textContent = data;
        btnUsuario.onclick = async() => {
            (document.getElementById('user-seleccionado') as HTMLElement).textContent = data;
            _usuario.userReceptorId = data;
            await InvocarHubMensajes(data);
            //CargarMensajes(data);
        }

        columna.appendChild(btnUsuario);

        contenedor.appendChild(columna);
    });
}

const EnviarMensaje = (usuario : Usuario) => {
    _connection.invoke('nuevoMensaje', usuario)
    .catch(err => console.log(err));

    let contenedorChat = document.querySelector('.chat');

    let li = document.createElement('li');
    li.textContent = `Tú: ${usuario.mensaje}`;

    contenedorChat.appendChild(li);
} 

const NuevoMensaje = (mensaje : string) => {
    const contenedorNotificacion = document.getElementById('alerta-conectado');

    contenedorNotificacion.style.display = 'block';

    const strMensaje = document.getElementById('id-cliente') as HTMLElement;
    strMensaje.textContent = mensaje;

    //let li = document.createElement('li');
    //li.textContent = mensaje;

    //contenedorChat.appendChild(li);
}

async function InvocarHubMensajes(userReceptor : string)
{
    await _connection.invoke('obtenerMensajes', userReceptor)
    .then(response => {
        return response as ChatUsuarios[]
    })
    .then(json => {
        const contenedorChat = document.querySelector('.chat');
        contenedorChat.innerHTML = '';

        console.log(json);

        json.forEach((objeto) => {

            console.log(`objeto ${objeto.mensaje}`);

            let li = document.createElement('li');

            li.innerText = objeto.mensaje;

            contenedorChat.appendChild(li);
        });
    })
    .catch(er => console.log(er));
    /*
    .then(response => {
        return response as Promise<ChatUsuarios[]>
    })
    .then(json => {
        return json
    })*/
}

async function CargarMensajes(userReceptor : string)
{
    let mensajes = await fetch(`/Home/ObtenerMensajes?userReceptor=${userReceptor}`, {
        method:'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al traer mensajes " + response.statusText)
        }

        return response.json() as Promise<ChatUsuarios[]>
    })
    .then(json => {
        return json;
    })

    console.log(mensajes);
}

enum Tipo
{
    Conexion = 1,
    Desconexion = 2
}