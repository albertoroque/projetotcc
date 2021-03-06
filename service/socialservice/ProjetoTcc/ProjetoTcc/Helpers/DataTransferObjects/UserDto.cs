﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetoTcc.Helpers.DataTransferObjects
{
    public class UserDto
    {
        public long id { get; set; }
        public string username { get; set; }

        public string nome { get; set; }

        public string fbid { get; set; }

        public string placeid { get; set; }

        public string avatar { get; set; }
        public IEnumerable<PostDto> posts { get; set; }

        public UserDto(ProjetoTcc.Models.BusinessModels.User user)
        {
            this.id = user.id;
            this.username = user.username;
            this.nome = user.nome;
            this.fbid = user.fbid;
            this.placeid = user.placeId;
            this.avatar = user.avatar;
            this.posts = user.Post.Select(model => new PostDto(model)).OrderByDescending(o => o.id);
        }
    }
}