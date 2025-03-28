using Application.Activities.Queries;
using Application.Mappings;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using Application.Activities.Validator;
using Application.Validator;
using API.MiddleWare;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces;

using Infrastructure.Security;
using static Infrastructure.Security.IsHostRequirement;
using Infrastructure.Photos;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Allow requests from frontend
                  .AllowAnyMethod() // Allow GET, POST, PUT, DELETE
                  .AllowAnyHeader() // Allow headers like Authorization, Content-Type
                  .AllowCredentials(); // Allow cookies and authentication tokens if needed
        });
});

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = false; // ✅ Disable email confirmation

})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// 🔹 Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
    };
});

builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build())
        .AddPolicy("IsHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Correct Swagger setup
builder.Services.AddMediatR((opt) =>
{
    opt.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    opt.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddTransient<ExceptionMiddelware>();

builder.Services.Configure<CloudinarySettings>
(builder.Configuration.GetSection("CloudinarySettings"));

var app = builder.Build();
app.UseMiddleware<ExceptionMiddelware>();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    try
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<AppDbContext>();
        var userManager = services.GetRequiredService<UserManager<User>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        await context.Database.MigrateAsync();
        await DbInitializer.SeedData(context, userManager, roleManager);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during migration");
    }
}


app.MapControllers();

app.Run();
