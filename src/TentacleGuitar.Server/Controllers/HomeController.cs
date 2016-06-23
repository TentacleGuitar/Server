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

        [HttpPost("/SubmitScore")]
        public IActionResult SubmitScore(Guid Id, string Token, int Score)
        {
            var user = DB.Users.Single(x => x.Token == Token);
            DB.Histories.Add(new History { MusicId = Id, Point = Score, Time =DateTime.Now, UserId = user.Id });
            DB.SaveChanges();
            return Content("OK");
        }

        [HttpPost("/GetInstrument")]
        public IActionResult GetInstrument(Guid Id)
        {
            var music = DB.Musics.SingleOrDefault(x => x.Id == Id);
            if (music == null)
            {
                Response.StatusCode = 404;
                return Content("Not Found");
            }
            return File(music.Instrument, "application/octet-stream");
        }

        [HttpPost("/GetTabular")]
        public IActionResult GetTabular(Guid Id)
        {
            var music = DB.Musics.SingleOrDefault(x => x.Id == Id);
            if (music == null)
            {
                Response.StatusCode = 404;
                return Content("Not Found");
            }
            return Content(music.Tabular);
        }
    }
}
