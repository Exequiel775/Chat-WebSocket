namespace ChatSignalR.Servicios.Localidad
{
    using Provincia;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using System.Linq;
    using System;
    public class LocalidadServicio
    {
        private static readonly List<Localidad> _listaLocalidad = new List<Localidad>();
        private static readonly List<Provincia> _listaProvincia = new List<Provincia>();

        public LocalidadServicio()
        {
            Task.Run(() => CargarListas());
        }
        public async Task<bool> Add(Localidad localidad)
        {
            if (Object.ReferenceEquals(localidad, null))
                throw new Exception("La localidad no puede ser Null..");
                
            try
            {
                var taskAdd = new Task(() => _listaLocalidad.Add(localidad));

                taskAdd.Start();

                await taskAdd;

                if (taskAdd.IsCompletedSuccessfully) 
                    return true;

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<Object>> GetLocalidadsAsync()
        {
            /*
            var groupJoin = _listaLocalidad.GroupJoin(_listaProvincia,
            loc => loc.NumeroProvincia,
            prov => prov.Numero,
            (localidad, provincias) => new {
                Localidad = localidad.Descripcion,
                Provincias = provincias
            });*/

            var tareaGet = new Task<IEnumerable<Object>>(() => _listaLocalidad.GroupJoin(_listaProvincia,
            loc => loc.NumeroProvincia,
            prov => prov.Numero,
            (localidad, provincias) => new {
                Localidad = localidad.Descripcion,
                Provincias = provincias
            }));

            tareaGet.Start();

            var task = await tareaGet;

            if (tareaGet.IsCompletedSuccessfully) {
                return task;
            }

            throw new Exception("Error al devolver listado");
        }

        private async Task CargarListas()
        {
            _listaProvincia.Add(new Provincia
            {
                Numero = 1,
                Descripcion = "Tucumán"
            });

            _listaProvincia.Add(new Provincia
            {
                Numero = 2,
                Descripcion = "Buenos Aires"
            });

            await this.Add(new Localidad
            {
                Numero = 1,
                NumeroProvincia = 1,
                Descripcion = "Las Talitas"
            });

            await this.Add(new Localidad
            {
                Numero = 2,
                NumeroProvincia = 1,
                Descripcion = "Tafi Viejo"
            });

            await this.Add(new Localidad
            {
                Numero = 3,
                NumeroProvincia = 2,
                Descripcion = "Ramos Mejia"
            });
        }
    }
}