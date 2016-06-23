﻿using System;
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
            return Content(user?.Token ?? "Access Denied");
        }
    }
}
