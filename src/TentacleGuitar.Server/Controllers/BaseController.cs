using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TentacleGuitar.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace TentacleGuitar.Server.Controllers
{
    public class BaseController : BaseController<GuitarContext>
    {
    }
}
