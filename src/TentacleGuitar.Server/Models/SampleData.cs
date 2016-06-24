using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace TentacleGuitar.Server.Models
{
    public static class SampleData
    {
        public static async Task InitDB(IServiceProvider services)
        {
            var DB = services.GetRequiredService<GuitarContext>();
            var UserManager = services.GetRequiredService<UserManager<User>>();
            var RoleManager = services.GetRequiredService<RoleManager<IdentityRole<long>>>();

            DB.Database.EnsureCreated();

            await RoleManager.CreateAsync(new IdentityRole<long>("Root"));
            await RoleManager.CreateAsync(new IdentityRole<long>("Member"));

            var user = new User { UserName = "root", Email = "1@1234.sh" };
            await UserManager.CreateAsync(user, "123456");

            await UserManager.AddToRoleAsync(user, "Root");
        }
    }
}
