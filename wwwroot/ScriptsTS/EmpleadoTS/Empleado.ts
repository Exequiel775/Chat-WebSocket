export class Empleado
{
    legajo : number;
    nombre : string;
    apellido : string;
    dni : string;
    apyNom : string;

    constructor(legajo : number = null, nombre : string = null, apellido : string = null, dni : string = null)
    {
        this.legajo = legajo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}