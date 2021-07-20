using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ChatSignalR.Models;
using ChatSignalR.Servicios.Chat;
using ChatSignalR.Clases;
using ChatSignalR.Servicios.Empleado;

namespace ChatSignalR.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ChatServicio _chatServicio;
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _chatServicio = new ChatServicio();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public JsonResult ObtenerMensajes(string userReceptor)
        {
            var mensajes = _chatServicio.Mensajes(IdentidadUsuario.UserId, userReceptor);

            return Json(mensajes);
        }
    }
}
