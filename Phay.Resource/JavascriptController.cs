using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Phyah.Resource.Security;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phay.Resource
{
    [Route("api/js")]
    public class JavascriptController : Controller
    {
        [HttpGet]
        public object Get()
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js");
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
                return new { data = result, result = true, status = 200 };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpGet("{g}")]
        public object Get(string g)
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js", Base64Encoder.DecodeBase64(g));
                Console.WriteLine(path);
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
                return new { data = result, result = true, status = 200 };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpHead("{g}")]
        public object Head(string g)
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js",Base64Encoder.DecodeBase64(g));
                if (System.IO.File.Exists(path))
                {
                    return new { content = Base64Encoder.EncodeBase64(System.IO.File.ReadAllText(path)), result = true, status = 200 };
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("raw/{g}")]
        public object Raw(string g)
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js", Base64Encoder.DecodeBase64(g));
                if (System.IO.File.Exists(path))
                {
                    return new { content =System.IO.File.ReadAllText(path), result = true, status = 200 };
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("content/{g}")]
        public object Js(string g)
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js", Base64Encoder.DecodeBase64(g));
                if (System.IO.File.Exists(path))
                {
                    return new { content = Base64Encoder.EncodeBase64(System.IO.File.ReadAllText(path)), result = true, status = 200 };
                }

                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // POST api/values
        [HttpPost("{g}")]
        public object Post([FromBody]string value, string g)
        {
            try
            {
                var path = Path.Combine(Varibles.HostPath, "wwwroot", "js", Base64Encoder.DecodeBase64(g));
                if (!System.IO.File.Exists(path))
                {
                    System.IO.File.Create(path).Dispose();
                }
                System.IO.File.WriteAllText(path, value);
                return new { result = true, status = 200 };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        
    }
}
