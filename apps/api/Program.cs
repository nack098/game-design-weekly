using api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("SupabasePostgres")
    ?? throw new InvalidOperationException("Connection string 'SupabasePostgres' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var supabaseUrl = builder.Configuration["Supabase:Url"]
    ?? throw new InvalidOperationException("Supabase:Url is missing.");

var jwksUrl = $"{supabaseUrl.TrimEnd('/')}/auth/v1/.well-known/jwks.json";
using var httpClient = new HttpClient();
var jwksJson = await httpClient.GetStringAsync(jwksUrl);
var jsonWebKeySet = new JsonWebKeySet(jwksJson);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKeys = jsonWebKeySet.Keys,
        ValidateIssuer = true,
        ValidIssuer = $"{supabaseUrl.TrimEnd('/')}/auth/v1",
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();

// --- FLEXIBLE CORS SETUP ---
// Read allowed origins from appsettings.json or environment variables.
// Fallback to localhost variants if nothing is provided.
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:3000", "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AppCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
Console.WriteLine("Allowed origins:");

foreach (var origin in allowedOrigins)
{
    Console.WriteLine(origin);
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
//else
//{
// Render handles SSL/TLS termination at the proxy level.
// Keeping this ensures internal redirect compliance if needed.
// app.UseHttpsRedirection();
//}

app.UseRouting();

// Use the updated, flexible policy name here!
app.UseCors("AppCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
