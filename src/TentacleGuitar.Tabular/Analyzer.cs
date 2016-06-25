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
            xmlDoc.LoadXml(xml.Replace("<!DOCTYPE score-partwise PUBLIC \"-//Recordare//DTD MusicXML 2.0 Partwise//EN\" \"musicxml20/partwise.dtd\">",""));

            // 获取每分钟节拍数
            var tag = xmlDoc.GetElementsByTagName("per-minute");
            ret.BPM = Convert.ToInt32(tag.Item(0).InnerText.ToString());

            // 获取调弦信息
            var tuning = xmlDoc.GetElementsByTagName("staff-tuning");
            foreach (XmlNode x in tuning)
                ret.Staff.Add(new Staff { TuningStep = x.FirstChild.InnerText.ToString(), TuningOctave = Convert.ToInt32(x.LastChild.InnerText.ToString()) });

            // 获取全部小节
            var measures = xmlDoc.GetElementsByTagName("measure");

            var timePoint = 0L; // 当前时间点
            int delta = 0; // 定义下一时间点

            // 生成音符列表
            foreach (XmlNode x in measures)
            {
                int beats = 4, beatType = 4; // 定义拍号信息
                int timePerBeat; // 定义每拍占用毫秒数

                // 判断小节是否变奏
                if (x.ChildNodes.Cast<XmlNode>().Where(y => y.Name == "attributes").Count() > 0 && x.ChildNodes.Cast<XmlNode>().First(y => y.Name == "attributes").Cast<XmlNode>().Where(y => y.Name == "time").Count() > 0)
                {
                    var time = x.ChildNodes.Cast<XmlNode>().First(y => y.Name == "attributes").Cast<XmlNode>().Where(y => y.Name == "time").First();
                    beats = Convert.ToInt32(time.FirstChild.InnerText.ToString());
                    beatType = Convert.ToInt32(time.LastChild.InnerText.ToString());
                    timePerBeat = 60 * 1000 / ret.BPM;
                }

                // 开始分析小节中音符
                var notes = x.ChildNodes.Cast<XmlNode>().Where(y => y.Name == "note").ToList();
                foreach(var y in notes)
                {
                    // 判断是否为和弦
                    if (y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "chord").Count() == 0)
                    {
                        var type = y.ChildNodes.Cast<XmlNode>().First(z => z.Name == "type").InnerText.ToString();
                        switch(type)
                        {
                            case "whole":
                                delta = 60* 1000 * beats / ret.BPM;
                                break;
                            case "half":
                                delta = 60 * 1000 * beats / (ret.BPM * 2);
                                break;
                            case "quarter":
                                delta = 60 * 1000 * beats / (ret.BPM * 4);
                                break;
                            case "eigth":
                                delta = 60 * 1000 * beats / (ret.BPM * 8);
                                break;
                            case "16th":
                                delta = 60 * 1000 * beats / (ret.BPM * 16);
                                break;
                            default:
                                delta = 0;
                                break;
                        }
                        timePoint += delta;
                    }
                    if (!ret.Notes.ContainsKey(timePoint))
                        ret.Notes.Add(timePoint, new List<Note>());

                    // 判断是否为休止符
                    if (y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "rest").Count() > 0)
                        continue;

                    // 寻找品、弦信息
                    try
                    {
                        var technical = y.ChildNodes.Cast<XmlNode>().Where(z => z.Name == "notations").First().ChildNodes.Item(0);
                        if (technical == null)
                            continue;
                        ret.Notes[timePoint].Add(new Note { Duration = 1, Fret = Convert.ToInt32(technical.LastChild.InnerText.ToString()), String = Convert.ToInt32(technical.FirstChild.InnerText.ToString()) }); // Duration为音长，目前没有实施延音线逻辑
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                        continue;
                    }
                }
            }
            return ret;
        }
    }
}
