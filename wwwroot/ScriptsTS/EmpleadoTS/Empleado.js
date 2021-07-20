"use strict";
exports.__esModule = true;
exports.Empleado = void 0;
var Empleado = /** @class */ (function () {
    function Empleado(legajo, nombre, apellido, dni) {
        if (legajo === void 0) { legajo = null; }
        if (nombre === void 0) { nombre = null; }
        if (apellido === void 0) { apellido = null; }
        if (dni === void 0) { dni = null; }
        this.legajo = legajo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
    return Empleado;
}());
exports.Empleado = Empleado;
