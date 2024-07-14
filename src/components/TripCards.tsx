import { Link } from 'react-router-dom';
import '../assets/css/style.css';

interface Trip {
  id: string;
  title: string;
  duration: number;
  level: string;
  price: number;
  image: string;
}

interface TripCardsProps {
  trips: Trip[];
}

export function TripCards({ trips }: TripCardsProps) {
  return (
    <ul className="trip-list">
      {trips.map((trip) => (
        <li 
          key={trip.id} 
          data-test-id="trip-card" 
          className="trip-card"
        >
          <img
            data-test-id="trip-card-image"
            className='trip-img-height'
            src={trip.image}
            alt={`${trip.title} trip photo`}
          />
          <div className="trip-card__content">
            <div className="trip-info">
              <h3 data-test-id="trip-card-title" className="trip-info__title">
                {trip.title}
              </h3>

              <div className="trip-info__content">
                <span
                  data-test-id="trip-card-duration"
                  className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>

                <span data-test-id="trip-card-level" className="trip-info__level">
                  {trip.level}
                </span>
              </div>
            </div>

            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-card-price-value"
                className="trip-price__value"
              >
                ${trip.price}
              </strong>
            </div>
          </div>
          <Link
            data-test-id="trip-card-link"
            to={`/trip/${trip.id}`}
            className="button"
          >
            Discover a trip
          </Link>
        </li>
      ))}
    </ul>
  );
}