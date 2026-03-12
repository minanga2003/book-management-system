using System.ComponentModel.DataAnnotations;

namespace BookManagement.Api.Models;

/// <summary>
/// Request DTO for creating a new book.
/// </summary>
public class CreateBookRequest
{
    [Required, MaxLength(500)]
    public required string Title { get; set; }

    [Required, MaxLength(200)]
    public required string Author { get; set; }

    [Required, MaxLength(20)]
    public required string Isbn { get; set; }

    [Required]
    public DateOnly PublicationDate { get; set; }
}
