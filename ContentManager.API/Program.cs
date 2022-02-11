using ContentManager.API.Constants;
using ContentManager.API.DAL;
using ContentManager.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;

services.AddControllers();

services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
services.AddSingleton<IUrlHelperFactory, UrlHelperFactory>();

services.AddScoped<ConnectionString>();
services.AddScoped<ResourceDAL>();
services.AddScoped<ResourceService>();

services.AddScoped<LinkService>();


var app = builder.Build();



// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
