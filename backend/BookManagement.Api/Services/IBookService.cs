using BookManagement.Api.Models;

namespace BookManagement.Api.Services;

/// <summary>
/// Service interface for book CRUD operations.
/// </summary>
public interface IBookService
{
    IReadOnlyList<Book> GetAll();
    Book? GetById(int id);
    Book Create(CreateBookRequest request);
    Book? Update(int id, UpdateBookRequest request);
    bool Delete(int id);
}
