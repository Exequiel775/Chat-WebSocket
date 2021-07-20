namespace ChatSignalR.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using Servicios.Empleado;
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using System;
    public class HubEmpleado : Hub
    {
        private readonly EmpleadoServicio _empleadoServicio;

        public HubEmpleado(EmpleadoServicio empleadoServicio)
        {
            _empleadoServicio = empleadoServicio;
        }

        public async Task Informar(string mensaje)
        {
            if (string.IsNullOrEmpty(mensaje))
                throw new System.Exception("El mensaje no puede ser Null");

            await Clients.All.SendAsync("informar", mensaje);
        }

        public async Task NuevoEmpleado(Empleado empleado)
        {
            if (Object.ReferenceEquals(empleado, null))
                throw new Exception("El objeto empleado no puede ser Null");

            Task agregarEmpleado = new Task(async() => await _empleadoServicio.Add(empleado));

            agregarEmpleado.Start();
            
            await agregarEmpleado;

            await Clients.All.SendAsync("nuevoEmpleado", empleado);
        }

        public async Task ModificarEmpleado(Empleado empleado)
        {
            try
            {
                if (Object.ReferenceEquals(empleado, null))
                {
                    throw new Exception("El objeto a modificar no puede ser null");
                }

                await _empleadoServicio.Update(empleado);

                await Clients.All.SendAsync("modificarEmpleado", true);
            }
            catch
            {
                await Clients.All.SendAsync("modificarEmpleado", false);
            }
        }
    }
}