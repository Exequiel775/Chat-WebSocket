using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
namespace ChatSignalR.Repositorio
{
    public class Repositorio<T> : IRepositorio<T> where T : EntityBase.Base
    {
        private static readonly List<T> _entidad = new List<T>();
        public async Task<bool> Add(T entidad)
        {
            try
            {
                var taskAdd = new Task(() => _entidad.Add(entidad));

                taskAdd.Start();

                await taskAdd;

                if (taskAdd.IsCompletedSuccessfully) {
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var entidadEliminar = _entidad.FirstOrDefault(x => x.Id == id);

                var taskDelete = new Task(() => _entidad.Remove(entidadEliminar));

                taskDelete.Start();

                await taskDelete;

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<T>> Get()
        {
            var taskGet = new Task<IEnumerable<T>>(() => _entidad.ToList());

            taskGet.Start();

            return await taskGet;
        }

        public async Task<T> GetById(int id)
        {
            var taskGetId = new Task<T>(() => _entidad.FirstOrDefault(x => x.Id == id));

            taskGetId.Start();

            return await taskGetId;
        }
    }
}