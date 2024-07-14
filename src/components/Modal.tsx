import React, { useState } from 'react';
import bookings from '../assets/data/bookings.json';
import '../assets/css/style.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: {
    id: string;
    title: string;
    duration: number;
    level: string;
    price: number;
  };
}

export function Modal({ isOpen, onClose, trip }: ModalProps) {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState('');

  const total = trip.price * guests;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    const selectedDate = new Date(date);
    if (selectedDate < tomorrow) {
      alert('Planned date, should be not earlier than tomorrow');
      return;
    }

    const newBooking = {
      id: `${Date.now()}`,
      userId: 'UserId',
      tripId: `${trip.id}`,
      guests: guests,
      date: selectedDate.toISOString().slice(0, 10),
      trip: {
        title: trip.title,
        duration: trip.duration,
        price: trip.price,
      },
      totalPrice: total,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    onClose();
  };

  return (
    <div hidden={!isOpen}>
      <div className="modal">
        <div data-test-id="book-trip-popup" className="book-trip-popup">
          <button
            data-test-id="book-trip-popup-close"
            className="book-trip-popup__close"
            onClick={onClose}
          >
            ×
          </button>
          <form className="book-trip-popup__form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="trip-info">
              <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span
                  data-test-id="book-trip-popup-duration"
                  className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                <span
                  data-test-id="book-trip-popup-level"
                  className="trip-info__level"
                >
                  {trip.level}
                </span>
              </div>
            </div>
            <label className="input">
              <span className="input__heading">Date</span>
              <input
                data-test-id="book-trip-popup-date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label className="input">
              <span className="input__heading">Number of guests</span>
              <input
                data-test-id="book-trip-popup-guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                required
              />
            </label>
            <span className="book-trip-popup__total">
              Total:
              <output
                data-test-id="book-trip-popup-total-value"
                className="book-trip-popup__total-value"
              >
                ${total}
              </output>
            </span>
            <button
              data-test-id="book-trip-popup-submit"
              className="button"
              type="submit"
            >
              Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}