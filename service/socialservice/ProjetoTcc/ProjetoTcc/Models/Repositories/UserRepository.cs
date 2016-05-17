using ProjetoTcc.Models.BusinessModels;
using SocialService.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetoTcc.Models.Repositories
{
    internal class UserRepository : BaseRepository<User>
    {
        public UserRepository(SocialServiceEntities bd)
            : base(bd)
        {

        }
        public UserRepository()
            : this(new SocialServiceEntities())
        {

        }
    }
}