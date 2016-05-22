using ProjetoTcc.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjetoTcc.Helpers.Extensions;

namespace ProjetoTcc.Models.BusinessModels
{
    public class Social
    {
        private readonly SocialServiceEntities bd;
        public Social()
        {
            bd = new SocialServiceEntities();
        }

        public User CriarUsuario(User user)
        {
            try
            {
                user.username = user.username.ToLower();
                
                if (VerificaUsername(user.username))
                {
                    return null;
                }
                else
                {
                    var newUser = new User()
                    {
                        username = user.username,
                        password = user.password.ToMD5(),
                        avatar = user.avatar,
                        nome = user.nome,
                        fbid = user.fbid
                    };

                    var userRepository = new UserRepository(bd);
                    userRepository.Criar(newUser);
                    userRepository.Persistir();
                    return newUser;
                }                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool VerificaUsername(string username)
        {
            var user = new User();

            var count = user.Obter().Where(x => x.username.Equals(username)).Count();
      
            return count > 0 ? true : false; 
        }

        public User EditarUsuario(User user)
        {
            try
            {
                var newUser = new User().Obter(user.id);
                newUser.username = user.username;
                newUser.nome = user.nome;
                newUser.avatar = user.avatar;
                newUser.fbid = user.fbid;
                newUser.placeId = user.placeId;

                var userRepository = new UserRepository(bd);
                userRepository.Editar(newUser, newUser.id);
                userRepository.Persistir();
                return newUser;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string ExcluirUsuario(long id)
        {
            try
            {
                var userRepository = new UserRepository(bd);
                var postRepository = new PostRepository(bd);
                var user = userRepository.Obter(id);
                if (user == null)
                {
                    throw new System.Data.ObjectNotFoundException("Usuário inexistente!");
                }
                foreach (var item in user.Post.ToList())
                {
                    postRepository.Excluir(item);
                }
                userRepository.Excluir(user);
                userRepository.Persistir();
                return "Usuário excluído com sucesso.";
            }
            catch (Exception)
            {
                
                throw;
            }
            
        }
    }
}