using MaximumRecordsBackend.Models;
using MaximumRecordsBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaximumRecordsBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;
        private readonly ILogger<BookingController> _logger;

        public BookingController(
            AppDbContext context,
            EmailService emailService,
            ILogger<BookingController> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var booking = new Booking
                {
                    Name = dto.Name!,
                    Phone = dto.Phone!,
                    Email = dto.Email!,
                    Service = dto.Service!,
                    BookingDate = DateTime.Parse(dto.Date!),
                    BookingTime = TimeSpan.Parse(dto.Time!),
                    Comment = dto.Comment
                };

                await _context.Bookings.AddAsync(booking);
                await _context.SaveChangesAsync();

                await _emailService.SendConfirmationAsync(booking);

                return Ok(new
                {
                    success = true,
                    bookingId = booking.Id,
                    message = "Заявка успешно создана"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка создания заявки");
                return StatusCode(500, new
                {
                    error = "Ошибка при обработке заявки",
                    details = ex.Message
                });
            }
        }
    }

    public class BookingDto
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Service { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public string? Comment { get; set; }
    }
}