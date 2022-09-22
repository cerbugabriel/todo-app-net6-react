using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoApp.ApplicationCore.DTOs;
using TodoApp.ApplicationCore.Exceptions;
using TodoApp.ApplicationCore.Interfaces;
using TodoApp.Infrastructure.Repositories;

[ApiController]
[EnableCors("AnyPolicy")]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    private readonly ILogger<TodoController> logger;
    private readonly ITodoRepository todoRepository;

    public TodoController(ILogger<TodoController> logger, ITodoRepository todoRepository)
    {
        this.logger = logger;
        this.todoRepository = todoRepository;
    }


    [HttpGet]
    public ActionResult<TodoResponse> Get(int page, int rowsPerPage, string sortByStatus, string sortByDate, string filterByType)
    {
        return Ok(this.todoRepository.GetTodos(page, rowsPerPage, sortByStatus, sortByDate, filterByType));
    }

    [HttpPut("{id}")]
    public ActionResult<bool> Put(string id)
    {
        try
        {
            return Ok(this.todoRepository.UpdateTodo(id));
        }
        catch (NotFoundException)
        {
            logger.LogError("Error: " + id + " not found");
            return NotFound();
        }
    }
}