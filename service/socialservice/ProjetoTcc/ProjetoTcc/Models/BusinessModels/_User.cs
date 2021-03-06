﻿using ProjetoTcc.Helpers.Extensions;
using ProjetoTcc.Models.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;

namespace ProjetoTcc.Models.BusinessModels
{
    [MetadataType(typeof(UserMetadata))]
    public partial class User
    {
        private readonly SocialServiceEntities bd = new SocialServiceEntities();
        public User Obter(long id)
        {
            var userRepository = new UserRepository(bd);
            var user = userRepository.Obter(id);
            if (user == null)
            {
                throw new ObjectNotFoundException("Usuário inexistente!");
            }
            return user;
        }

        public User Obter(string username)
        {
            var userRepository = new UserRepository(bd);
            var user = userRepository.Obter(x => x.username.Equals(username)).FirstOrDefault();
            if (user == null)
            {
                throw new ObjectNotFoundException("Usuário inexistente!");
            }
            return user;
        }

        public IEnumerable<User> Obter()
        {
            var userRepository = new UserRepository(bd);
            var user = userRepository.Obter().ToList();
            if (user == null)
            {
                throw new ObjectNotFoundException("Usuário inexistente!");
            }
            return user;
        }

        public Post CriarPost(Post post)
        {
            try
            {
                var postRepository = new PostRepository(bd);
                post.idUser = this.id;
                postRepository.Criar(post);
                postRepository.Persistir();
                return post;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public Tuple<User, string, bool> AutenticarUsuario(string username, string password)
        {
            password = password.ToMD5();
            var userRepository = new UserRepository(bd);
            var user = userRepository.Obter(model => model.username.Equals(username) && model.password.Equals(password)).FirstOrDefault();
            if (user == null)
            {
                return new Tuple<User, string, bool>(user, "Username ou senha incorretos!", false);
            }
            else
                if (user.fbid != null)
                {
                    return new Tuple<User, string, bool>(user, "Faça login no Facebook e volte", false);
                }
                else
                {
                    return new Tuple<User, string, bool>(user, "Login efetuado", true);
                }


        }

        public Tuple<User, string, bool> AutenticarFacebook(string fbid)
        {
            var userRepository = new UserRepository(bd);
            var user = userRepository.Obter(model => model.fbid.Equals(fbid)).FirstOrDefault();
            if (user == null)
            {
                return new Tuple<User, string, bool>(user, "Erro ao logar com Facebook", false);
            }
            else
            {
                return new Tuple<User, string, bool>(user, "Login efetuado", true);
            }

        }


    }

    public class UserMetadata
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        [Required(ErrorMessage = "O username é obrigatório!")]
        public string username { get; set; }
    }
}