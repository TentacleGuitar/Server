using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TentacleGuitar.Server.Models
{
    public class User : IdentityUser<long>
    {
        [MaxLength(64)]
        public string Token { get; set; }

        public DateTime Expire { get; set; }
    }
}
