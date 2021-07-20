namespace ChatSignalR.Servicios.Chat
{
    using System.Linq;
    using System.Collections.Generic;
    public class ChatServicio
    {
        private static readonly List<Usuario> _listaUsuario = new List<Usuario>();

        public void Add(Usuario usuario)
        {
            _listaUsuario.Add(usuario);
            var datos = _listaUsuario.ToList();
        }

        public IEnumerable<Usuario> Mensajes(string emisor, string receptor)
        {
            var mensajes = _listaUsuario.Where(x => x.UserEmisorId == emisor || x.UserEmisorId == receptor
             && x.UserReceptorId == receptor || x.UserReceptorId == receptor);
            return _listaUsuario.Where(x => x.UserEmisorId == emisor && x.UserReceptorId == receptor
            || x.UserReceptorId == emisor && x.UserEmisorId == receptor);
        }
    }
}