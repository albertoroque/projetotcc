using ProjetoTcc.Models.BusinessModels;
using SocialService.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetoTcc.Models.Repositories
{
    internal class PostRepository : BaseRepository<Post>
    {
        public PostRepository(SocialServiceEntities bd) 
            : base(bd)
        {

        }
    }
}