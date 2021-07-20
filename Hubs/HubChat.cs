namespace ChatSignalR.Hubs
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using System.Collections.Generic;
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Servicios.Chat;
    using Clases;
    public class HubChat : Hub
    {
        private IDictionary<string, string> _diccionario = new Dictionary<string, string>();
        private static List<string> _listadoClientes = new List<string>();
        private readonly ChatServicio _chatServicio;

        public HubChat()
        {
            _chatServicio = new ChatServicio();
        }

        public override Task OnConnectedAsync()
        {
            _listadoClientes.Add(Context.ConnectionId);
            Clients.All.SendAsync("conectado", _listadoClientes);

            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                string mensaje = $"El cliente {Context.ConnectionId} se ah desconectado.";
                _listadoClientes.Remove(_listadoClientes.First(x => x == Context.ConnectionId));

                IdentidadUsuario.UserId = null;

                await Clients.All.SendAsync("desconexion", mensaje);
                //return base.OnDisconnectedAsync(exception);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task NuevoMensaje(Usuario usuario)
        {
            try
            {
                _chatServicio.Add(new Servicios.Chat.Usuario
                {
                    UserEmisorId = Context.ConnectionId,
                    UserReceptorId = usuario.UserReceptorId,
                    Mensaje = usuario.Mensaje
                });

                //var mensajes = _chatServicio.Mensajes(Context.ConnectionId, usuario.UserReceptorId);
                string mensaje = $"Nuevo mensaje de {Context.ConnectionId}";

                await Clients.Client(connectionId: usuario.UserReceptorId).SendAsync("nuevoMensaje", mensaje);
                //await Clients.User(userId: usuario.UserId).SendAsync("nuevoMensaje", usuario.Mensaje);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<IEnumerable<Servicios.Chat.Usuario>> ObtenerMensajes(string userReceptor)
        {
            var mensajes = new Task<IEnumerable<Servicios.Chat.Usuario>>(() => _chatServicio.Mensajes(Context.ConnectionId, userReceptor));

            mensajes.Start();

            return await mensajes;
            //await Clients.Client(Context.ConnectionId).SendAsync("obtenerMensajes", mensajes);
        }

    }
}