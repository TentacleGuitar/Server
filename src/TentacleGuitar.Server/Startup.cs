using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using TentacleGuitar.Server.Models;

namespace TentacleGuitar.Server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<GuitarContext>(x => x.UseSqlite("Data source=tentacleguitar.db"));

            services.AddIdentity<User, IdentityRole<long>>(x =>
            {
                x.Password.RequireDigit = false;
                x.Password.RequiredLength = 0;
                x.Password.RequireLowercase = false;
                x.Password.RequireNonAlphanumeric = false;
                x.Password.RequireUppercase = false;
                x.User.AllowedUserNameCharacters = null;
            })
                 .AddDefaultTokenProviders()
                 .AddEntityFrameworkStores<GuitarContext>();

            services.AddMvc();
            services.AddLogging();
        }

        public async void Configure(IApplicationBuilder app, ILoggerFactory logger)
        {
            logger.AddConsole(LogLevel.Warning, true);

            app.UseStaticFiles();
            app.UseIdentity();
            app.UseDeveloperExceptionPage();
            app.UseMvcWithDefaultRoute();

            await SampleData.InitDB(app.ApplicationServices);
        }
    }
}
