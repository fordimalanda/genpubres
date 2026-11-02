using Backend.Endpoints;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins(
        "http://localhost:3000",
        "http://192.168.56.1:3000"
    )
     .AllowAnyHeader()
     .AllowAnyMethod()));

builder.Services.AddHttpClient<IDeepSeekService, DeepSeekService>();

var app = builder.Build();

app.UseCors();
app.MapDeclineEndpoints();

app.Run();