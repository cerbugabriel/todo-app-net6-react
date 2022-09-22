using Microsoft.EntityFrameworkCore;
using TodoApp.ApplicationCore.Entities;
using TodoApp.Infrastrucure.Contexts;

namespace TodoApp.Infrastructure.Contexts
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }
        public DbSet<Todo>? Todos { get; set; }
    }
}