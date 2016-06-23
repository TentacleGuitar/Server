using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TentacleGuitar.Server.Models
{
    public class Music
    {
        public Guid Id { get; set; }

        [MaxLength(64)]
        public string Title { get; set; }

        public int Level { get; set; }

        public string Tabular { get; set; }

        public byte[] Instrument { get; set; }
    }
}
