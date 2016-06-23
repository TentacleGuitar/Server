using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TentacleGuitar.Server.Models
{
    public class User
    {
        public long Id { get; set; }

        [MaxLength(64)]
        public string UserName { get; set; }

        [MaxLength(64)]
        public string Password { get; set; }

        [MaxLength(64)]
        public string Email { get; set; }

        [MaxLength(64)]
        public string Token { get; set; }

        public DateTime Expire { get; set; }
    }
}
