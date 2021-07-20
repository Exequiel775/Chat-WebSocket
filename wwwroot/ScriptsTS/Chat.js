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
var SignalR = require("@microsoft/signalr");
var Usuario_1 = require("./Usuario");
var _connection = new SignalR.HubConnectionBuilder().withUrl('/hub').build();
// INSTANCIAMOS LA CLASE USUARIO 
var _usuario = new Usuario_1.Usuario();
_connection.start()
    .then(function () { return console.log('conectado...'); })["catch"](function () { return console.log('error al conectar al hub...'); });
_connection.on('conectado', function (usuarios) {
    //MostrarNotificacion(mensaje, Tipo.Conexion);
    ActualizarUsuarios(usuarios);
});
_connection.on('nuevoMensaje', function (mensaje) {
    NuevoMensaje(mensaje);
});
_connection.on('desconexion', function (mensaje) {
    //MostrarNotificacion(mensaje, Tipo.Desconexion);
});
document.querySelector('.enviar').addEventListener('click', function () {
    var mensaje = document.getElementById('mensaje').value;
    _usuario.mensaje = mensaje;
    console.log(_usuario);
    EnviarMensaje(_usuario);
});
function MostrarNotificacion(cliente, tipo) {
    var divAlerta = document.getElementById('alerta-conectado');
    var strMensaje = document.getElementById('id-cliente');
    if (tipo == Tipo.Conexion) {
        if (!divAlerta.classList.contains('alert-success')) {
            divAlerta.classList.remove('alert-danger');
            divAlerta.classList.add('alert-success');
        }
        strMensaje.textContent = "Bienvenido " + cliente;
        divAlerta.style.display = 'block';
    }
    if (tipo == Tipo.Desconexion) {
        strMensaje.textContent = cliente + " se ah desconectado.";
        if (!divAlerta.classList.contains('alert-danger')) {
            divAlerta.classList.remove('alert-success');
            divAlerta.classList.add('alert-danger');
        }
        divAlerta.style.display = 'block';
    }
}
function ActualizarUsuarios(usuarios) {
    var _this = this;
    var contenedor = document.querySelector('.contenedor');
    contenedor.innerHTML = '';
    usuarios.forEach(function (data) {
        var columna = document.createElement('div');
        columna.classList.add('col-12', 'col-sm-12', 'col-md-3', 'col-lg-3', 'col-xl-3');
        var btnUsuario = document.createElement('button');
        btnUsuario.classList.add('btn', 'm-1', 'usuario');
        btnUsuario.textContent = data;
        btnUsuario.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document.getElementById('user-seleccionado').textContent = data;
                        _usuario.userReceptorId = data;
                        return [4 /*yield*/, InvocarHubMensajes(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        columna.appendChild(btnUsuario);
        contenedor.appendChild(columna);
    });
}
var EnviarMensaje = function (usuario) {
    _connection.invoke('nuevoMensaje', usuario)["catch"](function (err) { return console.log(err); });
    var contenedorChat = document.querySelector('.chat');
    var li = document.createElement('li');
    li.textContent = "T\u00FA: " + usuario.mensaje;
    contenedorChat.appendChild(li);
};
var NuevoMensaje = function (mensaje) {
    var contenedorNotificacion = document.getElementById('alerta-conectado');
    contenedorNotificacion.style.display = 'block';
    var strMensaje = document.getElementById('id-cliente');
    strMensaje.textContent = mensaje;
    //let li = document.createElement('li');
    //li.textContent = mensaje;
    //contenedorChat.appendChild(li);
};
function InvocarHubMensajes(userReceptor) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _connection.invoke('obtenerMensajes', userReceptor)
                        .then(function (response) {
                        return response;
                    })
                        .then(function (json) {
                        var contenedorChat = document.querySelector('.chat');
                        contenedorChat.innerHTML = '';
                        console.log(json);
                        json.forEach(function (objeto) {
                            console.log("objeto " + objeto.mensaje);
                            var li = document.createElement('li');
                            li.innerText = objeto.mensaje;
                            contenedorChat.appendChild(li);
                        });
                    })["catch"](function (er) { return console.log(er); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function CargarMensajes(userReceptor) {
    return __awaiter(this, void 0, void 0, function () {
        var mensajes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/Home/ObtenerMensajes?userReceptor=" + userReceptor, {
                        method: 'GET'
                    })
                        .then(function (response) {
                        if (!response.ok) {
                            throw new Error("Error al traer mensajes " + response.statusText);
                        }
                        return response.json();
                    })
                        .then(function (json) {
                        return json;
                    })];
                case 1:
                    mensajes = _a.sent();
                    console.log(mensajes);
                    return [2 /*return*/];
            }
        });
    });
}
var Tipo;
(function (Tipo) {
    Tipo[Tipo["Conexion"] = 1] = "Conexion";
    Tipo[Tipo["Desconexion"] = 2] = "Desconexion";
})(Tipo || (Tipo = {}));
