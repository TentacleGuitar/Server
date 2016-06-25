using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TentacleGuitar.Tabular
{
    public class Tabular
    {
        public int BPM { get; set; }

        public Capo Capo { get; set; } = new Capo();

        public List<Staff> Staff { get; set; } = new List<Staff>();

        public Dictionary<long, List<Note>> Notes { get; set; } = new Dictionary<long, List<Note>>();
    }
}
