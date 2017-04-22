using Microsoft.EntityFrameworkCore;
using Phyah.Huaxue.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue.Biz
{
    public abstract class ServiceBase<T>  where T : class, IEntity
    {
        DbContext db;
        public ServiceBase(DbContext context)
        {
            this.db = context;
        }

        public DbContext Context
        {
            get
            {
                return db;
            }
        }

        #region ICommon<T>  
        public T Add(T model)
        {
            db.Set<T>().Add(model);
            db.SaveChanges();
            return model;
        }
        public T Update(T model)
        {
            if (db.Entry<T>(model).State == EntityState.Modified)
            {
                db.SaveChanges();
            }
            else if (db.Entry<T>(model).State == EntityState.Detached)
            {
                try
                {
                    db.Set<T>().Attach(model);
                    db.Entry<T>(model).State = EntityState.Modified;
                }
                catch (InvalidOperationException)
                {
                    T old = Find(model.Id);
                    db.Entry(old).CurrentValues.SetValues(model);
                }
                db.SaveChanges();
            }
            return model;
        }
        public void Delete(T model)
        {
            db.Set<T>().Remove(model);
            db.SaveChanges();
        }
        public void Delete(params object[] keyValues)
        {
            T model = Find(keyValues);
            if (model != null)
            {
                db.Set<T>().Remove(model);
                db.SaveChanges();
            }
        }
        public T Find(params object[] keyValues)
        {
            return db.Set<T>().Find(keyValues);
        }
        public List<T> FindAll()
        {
            return db.Set<T>().ToList();
        }
        #endregion
    }
}
