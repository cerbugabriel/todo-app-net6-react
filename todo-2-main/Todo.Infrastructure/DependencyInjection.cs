using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoApp.ApplicationCore.Interfaces;
using TodoApp.Infrastructure.Contexts;
using TodoApp.Infrastructure.Repositories;
using TodoApp.Infrastrucure.Contexts;

namespace TodoApp.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddDbContext<TodoContext>(options =>
               options.UseInMemoryDatabase("TodoDatabase"));

            services.AddScoped<ITodoRepository, TodoRepository>();

            return services;
        }
    }
}