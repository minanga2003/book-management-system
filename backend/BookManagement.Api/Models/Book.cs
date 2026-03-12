namespace BookManagement.Api.Models;

/// <summary>
/// Represents a book in the system.
/// </summary>
public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Isbn { get; set; }
    public DateOnly PublicationDate { get; set; }
}
