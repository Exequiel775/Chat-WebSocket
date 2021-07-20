import { Empleado } from './Empleado';
import { RequestRepository } from '../Requests/Request';

export class EmpleadoServicio
{
    private readonly _repository : RequestRepository<Empleado> = new RequestRepository<Empleado>();

    async Add(empleado : Empleado) : Promise<boolean>
    {
        let ejecutarAdd = await this._repository.Post(empleado, '/Empleado/AgregarEmpleado');

        return ejecutarAdd;
    }

    async ListadoEmpleados() : Promise<Empleado[]>
    {
        return await this._repository.Get('/Empleado/ListadoEmpleados');
    }

    async UpdateEmpleado(empleado : Empleado) : Promise<boolean>
    {
        return await this._repository.Put(empleado, '/Empleado/ModificarEmpleado');
    }
}