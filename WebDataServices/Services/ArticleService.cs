using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Phyah.WebDataServices.Services
{
    public class ArticleService : Service<Article>, IArticleService
    {
        public ArticleService(DbContext Context) : base(Context)
        {
        }
        public ArticleService() : this(new DataContext()) { }
    }
}
