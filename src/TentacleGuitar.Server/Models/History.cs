using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TentacleGuitar.Server.Models
{
    public class History
    {
        public Guid Id { get; set; }

        public long UserId { get; set; }

        public virtual User User { get; set; }

        public Guid MusicId { get; set; }

        public virtual Music Music { get; set; }

        public DateTime Time { get; set; }

        public long Point { get; set; }
    }
}
