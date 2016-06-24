using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TentacleGuitar.Server.Models
{
    public class GuitarContext : IdentityDbContext<User, IdentityRole<long>, long>
    {
        public GuitarContext(DbContextOptions opt) 
            : base(opt)
        {
        }

        public DbSet<Music> Musics { get; set; }

        public DbSet<History> Histories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Music>(e =>
            {
                e.HasIndex(x => x.Title);
                e.HasIndex(x => x.Level);
            });

            builder.Entity<History>(e =>
            {
                e.HasIndex(x => x.Time);
                e.HasIndex(x => x.Point);
            });
        }
    }
}
