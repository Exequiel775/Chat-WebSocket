namespace ChatSignalR.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Servicios.Empleado;
    using Hubs;
    using System.Threading.Tasks;
    using Servicios.Localidad;
    public class EmpleadoController : Controller
    {
        private readonly EmpleadoServicio _empleadoServicio;
        private readonly LocalidadServicio _localidadServicio;
        public EmpleadoController(EmpleadoServicio empleadoServicio)
        {
            _empleadoServicio = empleadoServicio;
            _localidadServicio = new LocalidadServicio();
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var listado = await _localidadServicio.GetLocalidadsAsync();
            
            return View();
        }

        [HttpGet]
        public JsonResult ListadoEmpleados()
        {
            return Json(_empleadoServicio.GetEmpleados());
        }

        [HttpPost]
        public async Task<JsonResult> AgregarEmpleado([FromBody] Empleado empleado)
        {
            try
            {
                await _empleadoServicio.Add(empleado);
                return Json(true);
            }
            catch
            {
                return Json(false);
            }
        }
    }
}