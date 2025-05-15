namespace MaximumRecordsBackend.Models
{
    public class BookingDto
    {
        public required string Name { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Service { get; set; }
        public required string Date { get; set; }
        public required string Time { get; set; }
        public string? Comment { get; set; } // Допускает null
    }
}