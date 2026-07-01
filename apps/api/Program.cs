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

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevFrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseCors("DevFrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
