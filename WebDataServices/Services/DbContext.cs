using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore.Extensions;

namespace Phyah.WebDataServices.Services
{
    public class DataContext : DbContext
    {
        public DbSet<Card> Card { set; get; }
       
        public DbSet<Article> Article { set; get; }
        public DbSet<Contactor> Contactor { set; get; }
        public static string ConnectionString { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseMySQL(ConnectionString);
    }
}
