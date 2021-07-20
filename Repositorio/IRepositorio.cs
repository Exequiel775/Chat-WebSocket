namespace ChatSignalR.Repositorio
{
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using EntityBase;
    public interface IRepositorio<T> where T : Base
    {
        Task<bool> Add(T entidad);
        Task<IEnumerable<T>> Get();
        Task<T> GetById(int id);
        Task<bool> Delete(int id);
    }
}