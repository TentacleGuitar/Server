using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace TentacleGuitar.Tabular
{
    public static class Analyzer
    {
        public static Tabular ParseMusicXml(string xml)
        {
            var ret = new Tabular();
            var xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xml);

            // 获取每分钟节拍数
            ret.BPM = Convert.ToInt32(xmlDoc.GetElementsByTagName("per-minute").Item(0).Value.ToString());

            // 获取调弦信息
            var tuning = xmlDoc.GetElementsByTagName("staff-tuning");
            foreach (XmlNode x in tuning)
                ret.Staff.Add(new Staff { TuningStep = x.FirstChild.Value.ToString(), TuningOctave = Convert.ToInt32(x.LastChild.Value.ToString()) });

            // 获取全部小节
            var measures = xmlDoc.GetElementsByTagName("measure");

            var timePoint = 0L; // 当前时间点
            int delta = 0; // 定义下一时间点

            // 生成音符列表
            foreach (XmlNode x in measures)
            {
                int beats, beatType; // 定义拍号信息
                int timePerBeat; // 定义每拍占用毫秒数

                // 判断小节是否变奏
                if (x.ChildNodes.Cast<XmlNode>().Where(y => y.Name == "attributes").Count() > 0 && x.ChildNodes.Cast<XmlNode>().First(y => y.Name == "attributes").Cast<XmlNode>().Where(y => y.Name == "time").Count() > 0)
                {
                    var time = x.ChildNodes.Cast<XmlNode>().First(y => y.Name == "attributes").Cast<XmlNode>().Where(y => y.Name == "time").First();
                    beats = Convert.ToInt32(time.FirstChild.Value.ToString());
                    beatType = Convert.ToInt32(time.LastChild.Value.ToString());
                    timePerBeat = 60 * 1000 / ret.BPM;
                }

                // 开始分析小节中音符
                var notes = x.ChildNodes.Cast<XmlNode>().Where(y => y.Name == "note").ToList();
                foreach(var y in notes)
                {
                    // 判断是否为休止符
                    if (y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "rest").Count() == 0)
                        continue;

                    // 判断是否为和弦
                    if (y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "chord").Count() == 0)
                        timePoint += delta;
                    if (!ret.Notes.ContainsKey(timePoint))
                        ret.Notes.Add(timePoint, new List<Note>());

                    // 寻找品、弦信息
                    var technical = y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "technical").FirstOrDefault();
                    if (technical == null)
                        continue;

                    ret.Notes[timePoint].Add(new Note { Duration = 1, Fret = Convert.ToInt32(technical.LastChild.Value.ToString()), String = Convert.ToInt32(technical.FirstChild.Value.ToString()) }); // Duration为音长，目前没有实施延音线逻辑
                }
            }

            return ret;
        }
    }
}
