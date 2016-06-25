﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using TentacleGuitar.Server.Models;

namespace TentacleGuitar.Server.Controllers
{
    public class SystemController : BaseController
    {
        [AnyRoles("Root")]
        public IActionResult Manage()
        {
            return View(DB.Musics.OrderBy(x => x.Level).ToList());
        }

        [HttpGet]
        [AnyRoles("Root")]
        public IActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        [AnyRoles("Root")]
        public IActionResult Upload(Music Model, IFormFile Instrument)
        {
            Model.Instrument = Instrument.ReadAllBytes();
            DB.Musics.Add(Model);
            DB.SaveChanges();
            return RedirectToAction("Manage", "System");
        }

        [HttpGet]
        [AnyRoles("Root")]
        public IActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        [AnyRoles("Root")]
        public IActionResult Edit(Guid id, int level, string title, string tabular, IFormFile instrument)
        {
            var music = DB.Musics.Single(x => x.Id == id);
            music.Title = title;
            music.Level = level;
            music.Tabular = tabular;
            music.Instrument = instrument.ReadAllBytes();
            DB.SaveChanges();
            return View();
        }

        [HttpPost]
        [AnyRoles("Root")]
        public IActionResult Delete(Guid id)
        {
            var music = DB.Musics.Single(x => x.Id == id);
            DB.Musics.Remove(music);
            DB.SaveChanges();
            return RedirectToAction("Manage", "System");
        }
    }
}
