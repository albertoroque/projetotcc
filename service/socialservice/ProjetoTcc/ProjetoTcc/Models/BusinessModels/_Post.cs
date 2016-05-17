using ProjetoTcc.Models;
using ProjetoTcc.Models.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Data;

namespace ProjetoTcc.Models.BusinessModels
{
    public partial class Post
    {
        private readonly SocialServiceEntities bd = new SocialServiceEntities();
        public Post Obter(long id)
        {
            var postRepository = new PostRepository(bd);
            var post = postRepository.Obter(id);
            if (post == null)
            {
                throw new ObjectNotFoundException("Post inexistente!");
            }
            return post;
        }

        public IEnumerable<Post> Obter()
        {
            var postRepository = new PostRepository(bd);
            var posts = postRepository.Obter().ToList();
            if (posts == null)
            {
                throw new ObjectNotFoundException("Post inexistente!");
            }
            return posts;
        }

        public Post Editar(Post post)
        {
            try
            {
                var newPost = new Post().Obter(post.id);
                newPost.url = post.url;

                var postRepository = new PostRepository(bd);
                postRepository.Editar(newPost, newPost.id);
                postRepository.Persistir();
                return newPost;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Excluir(long id)
        {
            try
            {
                var postRepository = new PostRepository(bd);

                var post = postRepository.Obter(id);
                if (post == null)
                {
                    throw new System.Data.ObjectNotFoundException("Post inexistente!");
                }
                postRepository.Excluir(post);
                postRepository.Persistir();
                return "Post excluído com sucesso.";
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public class PostMetadata
        {
            [Key]
            [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
            public long id { get; set; }
        }
    }
}