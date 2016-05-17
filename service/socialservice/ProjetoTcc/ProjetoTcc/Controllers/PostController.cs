using ProjetoTcc.Helpers.DataTransferObjects;
using ProjetoTcc.Models.BusinessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;

namespace ProjetoTcc.Controllers
{
    [RoutePrefix("projetotcc/api/posts")]
    public class PostController : ApiController
    {
        [HttpGet]
        [Route("{id:long}")]
        public HttpResponseMessage Obter(long id)
        {
            try
            {
                var post = new Post();
                var result = post.Obter(id);
                return Request.CreateResponse(HttpStatusCode.OK, new PostDto(result));
            }
            catch (Exception ex)
            {
                if (ex is ObjectNotFoundException)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpGet]
        [Route("")]
        public HttpResponseMessage ObterTodos()
        {
            try
            {
                var post = new Post();
                var result = post.Obter();
                return Request.CreateResponse(HttpStatusCode.OK, result.Select(model => new PostDto(model)));
            }
            catch (Exception ex)
            {
                if (ex is ObjectNotFoundException)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPut]
        [Route("{id:long}")]
        public HttpResponseMessage Editar(long id, Post post)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    post.id = id;
                    var result = post.Editar(post);
                    return Request.CreateResponse(HttpStatusCode.OK, new PostDto(post.Obter(post.id)));
                }
                return Request.CreateResponse(HttpStatusCode.PreconditionFailed, "Campos inválidos.");
               
            }
            catch (Exception ex)
            {
                if (ex is ObjectNotFoundException)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
                }
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpDelete]
        [Route("{id:long}")]
        public HttpResponseMessage Excluir(long id)
        {
            try
            {
                var post = new Post();
                return Request.CreateResponse(HttpStatusCode.OK, post.Excluir(id));
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
