import { useState } from 'react';
import { MainHeader } from '../components/MainHeader'; 
import { TripCards } from '../components/TripCards';
import { Filters } from '../components/Filters';
import trips from '../assets/data/trips.json';

export function MainPage() {
  const [filters, setFilters] = useState({ 
    search: '', 
    duration: '', 
    level: '' 
  });

  const handleFilterChange = (
    newFilters: { 
      search: string, 
      duration: string, 
      level: string 
    }) => {
    setFilters(newFilters);
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDuration = !filters.duration || (
      filters.duration === '0_5' && trip.duration <= 5 ||
      filters.duration === '5_10' && trip.duration > 5 && trip.duration <= 10 ||
      filters.duration === '10' && trip.duration > 10
    );

    const matchesLevel = !filters.level || trip.level === filters.level;
    
    return matchesSearch && matchesDuration && matchesLevel;
  });

  return (
    <>
      <MainHeader />
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <Filters onFilterChange={handleFilterChange} />
        <section className="trips">
          <h2 className="visually-hidden">Trips List</h2>
          <TripCards trips={filteredTrips} />
        </section>
      </main>
    </>
  )
}