using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
: IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.UserId }));

        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Activities)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(u => u.Attendees)
            .HasForeignKey(aa => aa.ActivityId);

        builder.Entity<Photo>()
        .HasOne<User>(x => x.User)
        .WithMany(x => x.Photos)
        .HasForeignKey(x => x.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
}
