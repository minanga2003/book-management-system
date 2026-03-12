using BookManagement.Api.Models;
using BookManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookManagement.Api.Controllers;

/// <summary>
/// RESTful API for managing books.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    /// <summary>
    /// Gets all books.
    /// </summary>
    /// <response code="200">Returns the list of books.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Book>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<Book>> GetAll()
    {
        var books = _bookService.GetAll();
        return Ok(books);
    }

    /// <summary>
    /// Gets a book by ID.
    /// </summary>
    /// <param name="id">The book ID.</param>
    /// <response code="200">Returns the book.</response>
    /// <response code="404">Book not found.</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Book> GetById(int id)
    {
        var book = _bookService.GetById(id);
        if (book is null)
            return NotFound();
        return Ok(book);
    }

    /// <summary>
    /// Creates a new book.
    /// </summary>
    /// <param name="request">The book data.</param>
    /// <response code="201">Returns the created book.</response>
    /// <response code="400">Invalid request body.</response>
    [HttpPost]
    [ProducesResponseType(typeof(Book), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Book> Create([FromBody] CreateBookRequest request)
    {
        if (request is null)
            return BadRequest();
        var book = _bookService.Create(request);
        return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
    }

    /// <summary>
    /// Updates an existing book.
    /// </summary>
    /// <param name="id">The book ID.</param>
    /// <param name="request">The updated book data.</param>
    /// <response code="200">Returns the updated book.</response>
    /// <response code="404">Book not found.</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(Book), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Book> Update(int id, [FromBody] UpdateBookRequest request)
    {
        if (request is null)
            return BadRequest();
        var book = _bookService.Update(id, request);
        if (book is null)
            return NotFound();
        return Ok(book);
    }

    /// <summary>
    /// Deletes a book.
    /// </summary>
    /// <param name="id">The book ID.</param>
    /// <response code="204">Book deleted.</response>
    /// <response code="404">Book not found.</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int id)
    {
        if (!_bookService.Delete(id))
            return NotFound();
        return NoContent();
    }
}
