using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetoTcc.Helpers.DataTransferObjects
{
    public class PostDto
    {
        public long id { get; set; }
        public long idUser { get; set; }
        public string url { get; set; }
        public PostDto(ProjetoTcc.Models.BusinessModels.Post post )
        {
            this.id = post.id;
            this.idUser = post.idUser;
            this.url = post.url;
        }
    }
}