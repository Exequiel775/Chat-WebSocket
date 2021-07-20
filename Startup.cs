using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SignalR;
using ChatSignalR.Hubs;
using ChatSignalR.Servicios.Empleado;

namespace ChatSignalR
{
    public class Startup
    {
        private readonly EmpleadoServicio _empleadoServicio = new EmpleadoServicio();
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddSingleton(typeof(EmpleadoServicio), new EmpleadoServicio());

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapHub<HubChat>("/hub");
                    endpoints.MapHub<HubEmpleado>("/hubEmpleado");
            });
        }

        private async Task AgregarEmpleados()
        {
            await _empleadoServicio.Add(new Empleado
            {
                Legajo = 1,
                Nombre = "Rodrigo Exequiel",
                Apellido = "Gonzalez",
                Dni = "12345678"
            });

            await _empleadoServicio.Add(new Empleado
            {
                Legajo = 2,
                Nombre = "Jessica Fernanda",
                Apellido = "Chaves",
                Dni = "898918932"
            });
        }
    }
}
