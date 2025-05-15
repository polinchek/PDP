using MailKit.Net.Smtp;
using MaximumRecordsBackend.Models;
using Microsoft.Extensions.Options;
using MimeKit;

namespace MaximumRecordsBackend.Services
{
    public class EmailService
    {
        private readonly EmailSettings _settings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> settings, ILogger<EmailService> logger)
        {
            _settings = settings.Value;
            _logger = logger;
        }

        public async Task SendConfirmationAsync(Booking booking)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Maximum Records", _settings.FromEmail));
                message.To.Add(new MailboxAddress(booking.Name, booking.Email));
                message.Subject = "Подтверждение заявки";

                message.Body = new TextPart("html")
                {
                    Text = $@"<h2>Спасибо за вашу заявку, {booking.Name}!</h2>
                            <p>Номер вашей заявки: <strong>MR-{booking.Id}</strong></p>
                            <p>Мы свяжемся с вами для подтверждения.</p>"
                };

                using var client = new SmtpClient();
                await client.ConnectAsync(_settings.SmtpServer, _settings.SmtpPort, true);
                await client.AuthenticateAsync(_settings.SmtpUsername, _settings.SmtpPassword);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка отправки email");
                throw;
            }
        }
    }
}