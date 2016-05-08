using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace uploader.Controllers
{

    [RoutePrefix("api/upload")]
    public class ImagemController : ApiController
    {
        [HttpPost, Route("")]
        public HttpResponseMessage FileUpload(HttpPostedFileBase file)
        {
            string path;

            try
            {
                if (file != null)
                {
                    //ERRO SE FOTO MAIOR QUE 3 mbytes
                    if (file.ContentLength > 3200000)
                    {
                        return Request.CreateResponse(HttpStatusCode.InternalServerError, "Extensão não suportada"); ;
                    }

                    //VERIFICAR TIPO DO ARQUIVO
                    string extension = System.IO.Path.GetExtension(file.FileName);

                    if (!extension.Equals(".jpg") && !extension.Equals(".png"))
                    {
                        return Request.CreateResponse(HttpStatusCode.InternalServerError, "Extensão não suportada");
                    }

                    //MONTA ARQUIVO NO SERVIDOR
                    string g = Guid.NewGuid().ToString("N");

                    string filename = g + extension;

                    path = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("../img"), filename);
                    string cam = ("../img/" + filename);

                    file.SaveAs(path);

                    return Request.CreateResponse(HttpStatusCode.OK, cam);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "Ocorreu algum erro inesperado");
                }         
            }

            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Ocorreu algum erro inesperado");
            }            
        }
    }
}