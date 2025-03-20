using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options)
: IdentityDbContext<User>(options)
{
    public DbSet<Activity> Activities { get; set; }

}
