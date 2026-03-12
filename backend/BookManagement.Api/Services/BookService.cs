using BookManagement.Api.Models;

namespace BookManagement.Api.Services;

/// <summary>
/// In-memory implementation of book storage and CRUD operations.
/// </summary>
public class BookService : IBookService
{
    private static readonly List<Book> _books = new();
    private static int _nextId = 0;
    private static readonly object _lock = new();

    public IReadOnlyList<Book> GetAll()
    {
        lock (_lock)
        {
            return _books
                .OrderBy(b => b.Id)
                .ToList();
        }
    }

    public Book? GetById(int id)
    {
        lock (_lock)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }
    }

    public Book Create(CreateBookRequest request)
    {
        lock (_lock)
        {
            var book = new Book
            {
                Id = ++_nextId,
                Title = request.Title,
                Author = request.Author,
                Isbn = request.Isbn,
                PublicationDate = request.PublicationDate
            };

            _books.Add(book);
            return book;
        }
    }

    public Book? Update(int id, UpdateBookRequest request)
    {
        lock (_lock)
        {
            var existing = _books.FirstOrDefault(b => b.Id == id);
            if (existing is null)
                return null;

            if (request.Title is { } title)
                existing.Title = title;
            if (request.Author is { } author)
                existing.Author = author;
            if (request.Isbn is { } isbn)
                existing.Isbn = isbn;
            if (request.PublicationDate is { } date)
                existing.PublicationDate = date;

            return existing;
        }
    }

    public bool Delete(int id)
    {
        lock (_lock)
        {
            var existing = _books.FirstOrDefault(b => b.Id == id);
            if (existing is null)
                return false;

            _books.Remove(existing);
            return true;
        }
    }
}
