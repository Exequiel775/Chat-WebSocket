"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var EmpleadoServicio_1 = require("./EmpleadoServicio");
var SignalR = require("@microsoft/signalr");
var Empleado_1 = require("./Empleado");
var sweetalert2_1 = require("sweetalert2");
var _conexionHub = new SignalR.HubConnectionBuilder()
    .withUrl('/hubEmpleado').build();
_conexionHub.start()
    .then(function () { return console.log('conectado...'); })["catch"](function (er) { return console.error(er); });
_conexionHub.on('informar', function (mensaje) {
    alert("Ups... alguien escribio: " + mensaje);
});
_conexionHub.on('nuevoEmpleado', function (empleado) {
    NotificarNuevoEmpleado();
    ActualizarTablaSocket(empleado);
});
_conexionHub.on('modificarEmpleado', function (operacion) {
    if (operacion) {
        ActualizarTablaEmpleados();
    }
});
var _empleadoServicio = new EmpleadoServicio_1.EmpleadoServicio();
var _empleado = new Empleado_1.Empleado();
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ActualizarTablaEmpleados()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
document.querySelector('.informar').addEventListener('click', function () {
    var mensaje = 'Hola, informar a todos...';
    _conexionHub.invoke('informar', mensaje)["catch"](function (er) { return console.log(er); });
});
document.querySelector('.agregarEmpleado').addEventListener('click', function () {
    try {
        var legajo = document.getElementById('Legajo').value;
        var nombre = document.getElementById('Nombre').value;
        var apellido = document.getElementById('Apellido').value;
        var dni = document.getElementById('Dni').value;
        var objEmpleado = new Empleado_1.Empleado(parseInt(legajo), nombre, apellido, dni);
        _conexionHub.invoke('nuevoEmpleado', objEmpleado)["catch"](function (er) { return console.log("Error al agregar empleado: " + er); });
        sweetalert2_1["default"].fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'El empleado fue agregado exitosamente'
        });
    }
    catch (_a) {
        sweetalert2_1["default"].fire({
            title: 'Error al agregar',
            text: 'Ocurrio un error al agregar al empleado...',
            icon: 'error'
        });
    }
});
// Evento al dar click al actualizar en el modal
document.querySelector('.btnModificarEmpleado').addEventListener('click', function () {
    ModificarEmpleado();
});
function ActualizarTablaEmpleados() {
    return __awaiter(this, void 0, void 0, function () {
        var empleados, tabla;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _empleadoServicio.ListadoEmpleados()];
                case 1:
                    empleados = _a.sent();
                    tabla = document.querySelector('.tabla-empleados');
                    tabla.innerHTML = '';
                    empleados.forEach(function (empleado) {
                        var row = tabla.insertRow();
                        var btnModificar = document.createElement('button');
                        btnModificar.classList.add('btn', 'btn-primary');
                        btnModificar.textContent = 'Modificar';
                        btnModificar.dataset.toggle = 'modal';
                        btnModificar.dataset.target = '#modalModificarEmpleado';
                        btnModificar.onclick = function () {
                            CargarDatosEmpleado(empleado);
                        };
                        row.innerHTML = "\n        <td>" + empleado.legajo + "</td>\n        <td>" + empleado.apyNom + "</td>\n        <td>" + empleado.dni + "</td>\n        <td></td>\n        ";
                        row.children[3].appendChild(btnModificar);
                        // Asignamos el empleado seleccionado a nuestra variable privada
                        //_empleado = empleado;
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var NotificarNuevoEmpleado = function () {
    var notificacion = document.getElementById('notificacion');
    notificacion.innerHTML = '<strong>Atención!</strong> <p>Se agrego un nuevo empleado.</p>';
    notificacion.style.display = 'block';
    var timeOut = setTimeout(function () {
        notificacion.innerHTML = '';
        notificacion.style.display = 'none';
        clearTimeout(timeOut);
    }, 3000);
};
var ActualizarTablaSocket = function (empleado) {
    var tabla = document.querySelector('.tabla-empleados');
    var btnModificar = document.createElement('button');
    btnModificar.classList.add('btn', 'btn-primary');
    btnModificar.textContent = 'Modificar';
    btnModificar.dataset.toggle = 'modal';
    btnModificar.dataset.target = '#modalModificarEmpleado';
    btnModificar.onclick = function () {
        CargarDatosEmpleado(empleado);
    };
    var row = tabla.insertRow();
    row.innerHTML = "\n    <td>" + empleado.legajo + "</td>\n    <td>" + empleado.apyNom + "</td>\n    <td>" + empleado.dni + "</td>\n    <td></td>\n    ";
    row.children[3].appendChild(btnModificar);
    //
    _empleado = empleado;
};
var CargarDatosEmpleado = function (empleado) {
    var titulo = document.getElementById('apyNom');
    var nombre = document.getElementById('nuevoNombre');
    var apellido = document.getElementById('nuevoApellido');
    var dni = document.getElementById('nuevoDni');
    titulo.textContent = empleado.apyNom;
    nombre.value = empleado.nombre;
    apellido.value = empleado.apellido;
    dni.value = empleado.dni;
    _empleado = empleado;
};
function ModificarEmpleado() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            _empleado.nombre = document.getElementById('nuevoNombre').value;
            _empleado.apellido = document.getElementById('nuevoApellido').value;
            _empleado.dni = document.getElementById('nuevoDni').value;
            _conexionHub.invoke('modificarEmpleado', _empleado)["catch"](function (er) { return console.log("Error al modificar " + er); });
            return [2 /*return*/];
        });
    });
}
