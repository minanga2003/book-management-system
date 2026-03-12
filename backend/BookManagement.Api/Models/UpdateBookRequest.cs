using System.ComponentModel.DataAnnotations;

namespace BookManagement.Api.Models;

/// <summary>
/// Request DTO for updating an existing book.
/// </summary>
public class UpdateBookRequest
{
    [MaxLength(500)]
    public string? Title { get; set; }

    [MaxLength(200)]
    public string? Author { get; set; }

    [MaxLength(20)]
    public string? Isbn { get; set; }

    public DateOnly? PublicationDate { get; set; }
}
