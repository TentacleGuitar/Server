using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TentacleGuitar.Server.Models;

namespace TentacleGuitar.Server.Controllers
{
    public class HomeController : BaseController
    {
        [HttpPost("/SignIn")]
        public IActionResult SignIn(string Username, string Password)
        {
            var user = DB.Users.SingleOrDefault(x => x.UserName == Username && x.Password == Password);
            if (user.Expire <= DateTime.Now)
            {
                user.Token = Guid.NewGuid().ToString();
                user.Expire = DateTime.Now.AddDays(15);
                DB.SaveChanges();
            }
            return Content(user?.Token ?? "Access Denied");
        }

        [HttpPost("/GetMusics")]
        public IActionResult GetMusics()
        {
            return Json(DB.Musics.OrderBy(x => x.Level).ToList());
        }

        public IActionResult 
    }
}
