import '../assets/css/style.css';
import bookings from '../assets/data/bookings.json';
import { useNavigate } from 'react-router-dom';

export function BookingCards() {
  const navigate = useNavigate();

  const cancelBooking = (id: string) => {
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      bookings.splice(index, 1);
      navigate('/bookings');
    }
  };

  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <ul className="bookings__list">
      {sortedBookings.map((booking) => (
        <li
          data-test-id="booking"
          className="booking"
          key={booking.id}
        >
          <h3 data-test-id="booking-title" className="booking__title">{booking.trip.title}</h3>
          <span data-test-id="booking-guests" className="booking__guests">
            {booking.guests} guests
          </span>
          
          <span data-test-id="booking-date" className="booking__date">
            {new Date(booking.date).toLocaleDateString('en-CA')}
          </span>
          <span data-test-id="booking-total" className="booking__total">
            ${booking.totalPrice}
          </span>

          <button
            data-test-id="booking-cancel"
            className="booking__cancel"
            title="Cancel booking"
            onClick={() => cancelBooking(booking.id)}
          >
            <span className="visually-hidden">Cancel booking</span>
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}