namespace ChatSignalR.Servicios.Chat
{
    public class Usuario
    {
        public string UserReceptorId { get; set; }
        public string UserEmisorId { get; set; }
        #nullable disable
        public string Mensaje { get; set; }
        #nullable enable
    }
}