using Phyah.Configuration;
using Phyah.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Phyah.Web.ResourceManager
{
    public class CssBehavior : RestBehavior
    {
        public override string Text => "css";
        public async Task Get()
        {
            try
            {
                var path = System.IO.Path.Combine(AppSetting.AppSettings["HostPath"].ToString(), "wwwroot", "css");
                List<object> result = new List<object>();
                DirectoryInfo di = new DirectoryInfo(path);
                string temp = "";
                string ptemp = "";
                foreach (var item in di.GetDirectories())
                {
                    temp = item.FullName.Replace(path, "").Trim('/', '\\');
                    ptemp = item.Parent.FullName.Replace(path, "").Trim('/', '\\');
                    result.Add(new { guid = Base64Encoder.EncodeBase64(temp), name = item.Name, path = temp, parent = item.Parent.Name, parentGuid = Base64Encoder.EncodeBase64(ptemp), type = "folder" });
                }
                foreach (var item in di.GetFiles())
                {
                    temp = item.FullName.Replace(path, "").Trim('/', '\\');
                    ptemp = item.DirectoryName.Replace(path, "").Trim('/', '\\');
                    result.Add(new { guid = Base64Encoder.EncodeBase64(temp), name = item.Name, path = item.FullName.Replace(path, ""), parent = item.Directory.Name, parentGuid = Base64Encoder.EncodeBase64(ptemp), type = "file" });
                }
                await Json(new { data = result, result = true, status = 200 });
            }
            catch (Exception ex)
            {
                await Status(500, ex.Message);
            }
        }
        public async Task Head(string g)
        {
            try
            {
                var path = System.IO.Path.Combine(AppSetting.AppSettings["HostPath"].ToString(), "wwwroot", "css", Base64Encoder.DecodeBase64(g));
                if (System.IO.File.Exists(path))
                {
                    await Json(new { content = Base64Encoder.EncodeBase64(System.IO.File.ReadAllText(path)), result = true, status = 200 });
                }

            }
            catch (Exception ex)
            {
                await Status(500, ex.Message);
            }
        }
    }
}
