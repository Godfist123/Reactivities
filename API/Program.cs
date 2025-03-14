using Application.Activities.Queries;
using Application.Mappings;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;
using Application.Activities.Validator;
using Application.Validator;
using API.MiddleWare;

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

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Correct Swagger setup
builder.Services.AddMediatR((opt) =>
{
    opt.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    opt.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddTransient<ExceptionMiddelware>();
var app = builder.Build();
app.UseMiddleware<ExceptionMiddelware>();
app.UseCors("AllowFrontend");

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
        await context.Database.MigrateAsync();
        await DbInitializer.SeedData(context);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during migration");
    }
}

app.UseAuthorization();
app.MapControllers();

app.Run();
