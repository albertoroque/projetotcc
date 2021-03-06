﻿using ProjetoTcc.Models;
using ProjetoTcc.Models.BusinessModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace SocialService.Models.Repositories
{
    public class BaseRepository<TPrimaryEntity>
        where TPrimaryEntity : class
    {
        protected readonly SocialServiceEntities bd;
        protected readonly DbSet<TPrimaryEntity> PrimaryDatabaseSet;

        public BaseRepository(SocialServiceEntities _bd)
        {
            this.bd = _bd;
            this.PrimaryDatabaseSet = bd.Set<TPrimaryEntity>();
        }

        public virtual TPrimaryEntity Obter(long id)
        {
            try
            {
                this.bd.Configuration.AutoDetectChangesEnabled = false;
                return PrimaryDatabaseSet.Find(id);
            }
            finally
            {
                this.bd.Configuration.AutoDetectChangesEnabled = true;
            }
        }

        public virtual IQueryable<TPrimaryEntity> Obter()
        {
            return this.PrimaryDatabaseSet;
        }

        public virtual IQueryable<TPrimaryEntity> Obter(Expression<Func<TPrimaryEntity, bool>> expressao)
        {
            return this.Obter().Where(expressao);
        }

        public virtual void Criar(TPrimaryEntity Objeto)
        {
            if (Objeto == null)
            {
                throw new ArgumentNullException("Objeto", "Não é possível adicionar entidade com valores nulos.");
            }

            this.PrimaryDatabaseSet.Add(Objeto);
        }

        public virtual void Excluir(TPrimaryEntity Objeto)
        {
            if (Objeto == null)
            {
                throw new ArgumentNullException("Objeto", "Não é possível excluir entidade com valores nulos.");
            }
            this.PrimaryDatabaseSet.Remove(Objeto);
        }

        public virtual void Excluir(Expression<Func<TPrimaryEntity, bool>> expressao)
        {
            var records = this.PrimaryDatabaseSet.Where(expressao);
            foreach (var rec in records)
            {
                this.Excluir(rec);
            }
        }

        public virtual void Editar(TPrimaryEntity Objeto, long key)
        {
            this.Update<TPrimaryEntity>(Objeto, key);
        }

        private void Update<T>(T model, long key) where T : class
        {
            if (model == null)
            {
                throw new ArgumentNullException(model.ToString(), "Não é possível atualizar objeto com valores nulos.");
            }
            var entry = this.bd.Entry(model);
            if (entry.State == System.Data.EntityState.Detached)
            {
                var currentEntry = this.bd.Set<T>().Find(key);
                if (currentEntry != null)
                {
                    var attachedEntry = this.bd.Entry(currentEntry);
                    attachedEntry.CurrentValues.SetValues(model);
                }
                else
                {
                    this.bd.Set<T>().Attach(model);
                    entry.State = System.Data.EntityState.Modified;
                }
            }

        }

        public void Persistir()
        {
            try
            {
                bd.SaveChanges();
            }
            finally
            {
                bd.Database.Connection.Close();
            }
        }
    }
}