namespace ChatSignalR.Servicios.Empleado
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Repositorio;
    using System.Threading.Tasks;
    public class EmpleadoServicio
    {
        private readonly IRepositorio<Empleado> _repositorioEmpleado = new Repositorio<Empleado>();
        public async Task<bool> Add(Empleado empleado)
        {
            if (Object.ReferenceEquals(empleado, null)) 
            {
                throw new Exception("El objeto no puede estar null");
            }

            try
            {
                await _repositorioEmpleado.Add(empleado);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Empleado>> GetEmpleados()
        {
            return await _repositorioEmpleado.Get();
        }

        public async Task<Empleado> GetById(int id)
        {
            return await _repositorioEmpleado.GetById(id);
        }

        public async Task<bool> Update(Empleado empleado)
        {
            try
            {
                Empleado empleadoModificar = await _repositorioEmpleado.GetById(empleado.Id);

                empleadoModificar.Nombre = empleado.Nombre;
                empleadoModificar.Apellido = empleado.Apellido;
                empleadoModificar.Dni = empleado.Dni;

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}