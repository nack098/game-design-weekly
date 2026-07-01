using api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("SupabasePostgres")
    ?? throw new InvalidOperationException("Missing connection string");

// ---------------- DB ----------------
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString, npgsql =>
    {
        npgsql.CommandTimeout(10);
        npgsql.EnableRetryOnFailure(5);

        // IMPORTANT: makes EF Core more PgBouncer-friendly
        npgsql.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
    });

    // IMPORTANT: reduces tracking overhead (VERY important on pooler)
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

// ---------------- CORS ----------------
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>()
    ?? new[] { "http://localhost:5173" };

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AppCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseRouting();
app.UseCors("AppCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
