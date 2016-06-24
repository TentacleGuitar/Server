﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TentacleGuitar.Server.Models;

namespace TentacleGuitar.Server.Controllers
{
    public class BaseController : BaseController<GuitarContext, User, long>
    {
    }
}
