import '../assets/css/style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Booking } from '../types';

export function BookingCards() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings');
        setBookings(response.data as Booking[]);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id: string) => {
    try {
      await api.delete(`/bookings/${id}`);
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      navigate('/bookings');
    } catch (error) {
      console.error('Error cancelling booking:', error);
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
  );
}