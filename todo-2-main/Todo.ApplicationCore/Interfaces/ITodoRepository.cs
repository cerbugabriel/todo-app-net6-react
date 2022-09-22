using TodoApp.ApplicationCore.DTOs;
using System.Collections.Generic;

namespace TodoApp.ApplicationCore.Interfaces
{
    public interface ITodoRepository
    {
        Task<TodoResponse> GetTodos(int page, int rowsPerPage, string sortByStatus, string sortByDate, string filterByType);
        Task<bool> UpdateTodo(string TodoId);
    }
}