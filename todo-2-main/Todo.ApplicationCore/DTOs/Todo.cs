using System;
using System.ComponentModel.DataAnnotations;
using TodoApp.ApplicationCore.Entities;

namespace TodoApp.ApplicationCore.DTOs
{
    public class TodoResponse
    {
        public IEnumerable<Todo>? Todos { get; set; }
        public int TodosCount { get; set; }
    }
}