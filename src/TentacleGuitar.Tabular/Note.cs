using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TentacleGuitar.Tabular
{
    public class Note
    {
        /// <summary>
        /// 品
        /// </summary>
        public int Fret { get; set; }

        /// <summary>
        /// 弦
        /// </summary>
        public int String { get; set; }

        /// <summary>
        /// 持续时长
        /// </summary>
        public int Duration { get; set; }

        /// <summary>
        /// 演奏手法
        /// </summary>
        public PlayMode Mode { get; set; }
    }
}
