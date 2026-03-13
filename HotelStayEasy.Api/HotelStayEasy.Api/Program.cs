using Microsoft.EntityFrameworkCore;
using HotelStayEasy.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<StayEasyDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("PermitirTudo", builder =>
{
    //Alow = permitir
    //Origin = origem
    //Method = método
    //Header = cabeçalho
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
})
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("PermitirTudo");

app.UseAuthorization();

app.MapControllers();

app.Run();
