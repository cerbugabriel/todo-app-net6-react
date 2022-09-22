using AutoMapper;
using TodoApp.ApplicationCore.DTOs;
using TodoApp.ApplicationCore.Entities;
using TodoApp.ApplicationCore.Exceptions;
using TodoApp.ApplicationCore.Interfaces;
using TodoApp.Infrastructure.Contexts;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using static TodoApp.ApplicationCore.DTOs.TodoResponse;
using Microsoft.Extensions.Logging;

namespace TodoApp.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext TodoContext;
        private readonly IMapper mapper;

        public TodoRepository(TodoContext TodoContext, IMapper mapper)
        {
            this.TodoContext = TodoContext;
            this.mapper = mapper;
        }

        public async Task<TodoResponse> GetTodos(int page, int rowsPerPage, string sortByStatus, string sortByDate, string filterByType)
        {
            try
            {
                if (TodoContext.Todos == null)
                {
                    return new TodoResponse
                    {
                        Todos = new List<Todo>(),
                        TodosCount = 0
                    };
                }
                var filteredQuerry = TodoContext.Todos.AsQueryable();
                if (filterByType != "All")
                {
                    filteredQuerry = filteredQuerry.Where(x => x.Type == filterByType);
                }

                var sortedQuerry = filteredQuerry.OrderByDescending(x => x.Status == sortByStatus);
                if (sortByDate == "Asc")
                {
                    sortedQuerry = sortedQuerry.ThenBy(x => x.DueDate);
                }
                else
                {
                    sortedQuerry = sortedQuerry.ThenByDescending(x => x.DueDate);
                }

                var todoDsiplayList = await sortedQuerry.Skip((page) * rowsPerPage).Take(rowsPerPage).ToListAsync();
                return new TodoResponse
                {
                    Todos = todoDsiplayList,
                    TodosCount = filteredQuerry.Count()
                };
            }
            catch (Exception)
            {
                return new TodoResponse
                {
                    Todos = new List<Todo>(),
                    TodosCount = 0
                };
            }
        }

        public async Task<bool> UpdateTodo(string TodoId)
        {
            if (TodoContext.Todos == null)
            {
                return false;
            }
            var todo = TodoContext.Todos.FirstOrDefault(x => x.Id != null ? x.Id.ToUpper() == TodoId.ToUpper() : false);
            if (todo != null)
            {
                try
                {
                    todo.Status = "Done";
                    TodoContext.Todos.Update(todo);
                    await TodoContext.SaveChangesAsync();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                throw new NotFoundException();
            }
        }
    }
}