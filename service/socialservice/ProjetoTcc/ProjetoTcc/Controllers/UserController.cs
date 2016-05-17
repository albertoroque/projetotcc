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
    [RoutePrefix("projetotcc/api/users")]
    public class UserController : ApiController
    {
        /// <summary>
        ///     
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Cadastrar(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var social = new Social();
                    var result = social.CriarUsuario(user);
                    return Request.CreateResponse(HttpStatusCode.Created, new UserDto( user.Obter(result.id)));

                }
                return Request.CreateErrorResponse(HttpStatusCode.PreconditionFailed, "Campos incorretos.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
            
        }

        [HttpPut]
        [Route("{id:long}")]
        public HttpResponseMessage Editar(User user, long id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var social = new Social();
                    user.id = id;
                    var result = social.EditarUsuario(user);
                    return Request.CreateResponse(HttpStatusCode.OK, new UserDto(user.Obter(result.id)));
                }
                return Request.CreateErrorResponse(HttpStatusCode.PreconditionFailed, "Campos incorretos.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpDelete]
        [Route("{id:long}")]
        public HttpResponseMessage Excluir(long id)
        {
            try
            {
                var social = new Social();
                return Request.CreateResponse(HttpStatusCode.OK, social.ExcluirUsuario(id));
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet]
        [Route("{id:long}")]
        public HttpResponseMessage Obter(long id)
        {
            try
            {
                var user = new User();
                var result = user.Obter(id);
                return Request.CreateResponse(HttpStatusCode.OK, new UserDto(result));
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
                var user = new User();
                var result = user.Obter();
                return Request.CreateResponse(HttpStatusCode.OK, result.Select(model => new UserDto(model)));
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

        [HttpPost]
        [Route("{iduser:long}/posts")]
        public HttpResponseMessage CriarPost(long iduser, Post post)
        {
            try
            {
                var user = new User().Obter(iduser);
                if (user == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Usuário inexistente");
                }
                var response = user.CriarPost(post);
                return Request.CreateResponse(HttpStatusCode.Created, new PostDto(response));
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
    }
}
