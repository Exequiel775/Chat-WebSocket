namespace ChatSignalR.Servicios.Empleado
{
    public class Empleado : EntityBase.Base
    {
        public int Legajo { get; set; }
        public string Nombre {get; set; }
        public string Apellido { get; set; }
        public string Dni { get; set; }
        public string ApyNom => $"{Apellido}, {Nombre}";
        
    }
}