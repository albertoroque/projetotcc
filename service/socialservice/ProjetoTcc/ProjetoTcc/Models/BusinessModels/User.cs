//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProjetoTcc.Models.BusinessModels
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Post = new HashSet<Post>();
        }
    
        public long id { get; set; }
        public string fbid { get; set; }
        public string placeId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string nome { get; set; }
        public string avatar { get; set; }
    
        public virtual ICollection<Post> Post { get; set; }
    }
}
