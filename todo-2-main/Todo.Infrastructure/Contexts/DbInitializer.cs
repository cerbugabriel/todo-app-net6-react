using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using TodoApp.ApplicationCore.Entities;
using TodoApp.Infrastructure.Contexts;

namespace TodoApp.Infrastrucure.Contexts
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new TodoContext(
                serviceProvider.GetRequiredService<DbContextOptions<TodoContext>>()))
            {
                if (context.Todos == null)
                {
                    return;
                }
                if (context.Todos.Any())
                {
                    return;
                }
                using (StreamReader r = new StreamReader("./data.json"))
                {
                    string json = r.ReadToEnd();
                    var todosFromFile = JsonConvert.DeserializeObject<List<Todo>>(json);
                    if (todosFromFile != null)
                    {
                        foreach (var item in todosFromFile)
                        {
                            if (item.Id != null && item.Title != null && item.Content != null && item.Status != null && item.Type != null)
                            {
                                context.Todos.AddRange(new Todo(item.Id, item.Title, item.Content, item.CreationTime, item.DueDate, item.Status, item.Type));
                            }
                        }
                    }
                }
                context.SaveChanges();
            }
        }
    }

}

