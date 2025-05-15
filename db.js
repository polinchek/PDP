const sql = require('mssql');

const config = {
    server: 'DESKTOP-I99QP3P\\SQLEXPRESS',
    database: 'SoundStudioDB',
    options: {
        trustServerCertificate: true,
        trustedConnection: true // Используем аутентификацию Windows
    }
};

async function saveBooking(bookingData) {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        
        await request.query(`
            INSERT INTO Bookings 
            (ClientName, PhoneNumber, Email, BookingDate, SessionType, DurationHours) 
            VALUES 
            ('${bookingData.name}', '${bookingData.phone}', '${bookingData.email}', 
             '${bookingData.date}', '${bookingData.sessionType}', ${bookingData.duration})
        `);
        
        return true;
    } catch (err) {
        console.error('Ошибка записи:', err);
        return false;
    } finally {
        sql.close();
    }
}

module.exports = { saveBooking };