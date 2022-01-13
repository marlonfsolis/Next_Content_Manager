using ContentManager.API.Constants;
using ContentManager.API.DAL;
using ContentManager.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;

services.AddControllers();

services.AddSingleton<ConnectionString>();
services.AddSingleton<ResourcesDAL>();
services.AddSingleton<ResourcesService>();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
