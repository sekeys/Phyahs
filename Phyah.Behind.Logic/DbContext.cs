using Microsoft.EntityFrameworkCore;
using MySQL.Data.EntityFrameworkCore.Extensions;
using Phyah.Behind.Entities;

namespace Phyah.Behind.Logic
{
    public class DataContext : DbContext
    {
        public DbSet<RoleMenus> RoleMenus { set; get; }
       
        public DbSet<Sys_Menu> Sys_Menu { set; get; }
        public DbSet<Role> Roles { set; get; }
        public static string ConnectionString { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseMySQL(ConnectionString);
    }
}
