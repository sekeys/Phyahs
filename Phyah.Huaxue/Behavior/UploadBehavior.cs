using Phyah.Configuration;
using Phyah.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue
{
    public class UploadBehavior : Behavior
    {
        public override string Text => "upload";
        //        HttpContext context = enchyma["context"] as HttpContext;
        //        var req = enchyma.TypeOf<IEnchyma>("forms");
        //        string p = Immuno.Security.Base64Encoder.DecodeBase64(req.StringEx("parent"));
        //        FileinfoModel parent = null;
        //        var dbcontext = new DbContext<FileinfoModel>().Connect("Vitae", "Editor_FileInfo");
        //            if (!string.IsNullOrWhiteSpace(p))
        //            {
        //                parent = dbcontext.FindOne(x => x.UId == p);
        //            }
        //            foreach (var item in context.Request.Form.Files)
        //            {

        //                string type = req.StringEx("type");
        //    string file = req.StringEx("file");

        //    var path = parent == null ? "root\\" + item.FileName : parent.Path + "\\" + item.FileName;




        //                using (FileStream fs = new FileStream(dir, FileMode.CreateNew))
        //                {
        //                    item.CopyTo(fs);
        //                };
        //dbcontext.Insert(model);
        //            }
        //return Response(200);
        public override async Task Invoke()
        {
            try
            {
                string folder = System.IO.Path.Combine(AppSetting.AppSettings["hostdir"].ToString(), "wwwroot", "images");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                List<string> paths = new List<string>();
                foreach (var item in HttpContext.Request.Form.Files)
                {
                    var guid = Guid.NewGuid().ToString();
                    var path = System.IO.Path.Combine(folder, guid + item.FileName);
                    using (FileStream fs = new FileStream(path, FileMode.CreateNew))
                    {
                        item.CopyTo(fs);
                    };
                    paths.Add($"wwwroot/images/{guid}{item.FileName}");
                }
                await Json(new { result = true, urls = paths });
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
    }
}
