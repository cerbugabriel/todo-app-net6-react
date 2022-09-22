using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Microsoft.Extensions.Hosting;
using TodoApp.ApplicationCore;
using TodoApp.Infrastructure;
using TodoApp.Infrastructure.Contexts;
using TodoApp.Infrastrucure.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationCore();
builder.Services.AddInfrastructure();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AnyPolicy", policy =>
      policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());
});
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TodoContext>();

    DataGenerator.Initialize(services);
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AnyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();