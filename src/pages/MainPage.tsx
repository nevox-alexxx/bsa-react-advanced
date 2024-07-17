import { useState, useEffect } from 'react';
import { MainHeader } from '../components/MainHeader'; 
import { TripCards } from '../components/TripCards';
import { Filters } from '../components/Filters';
import api from '../api/api';
import { Trip } from '../types';

export function MainPage() {
  const [filters, setFilters] = useState({ 
    search: '', 
    duration: '', 
    level: '' 
  });

  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips');
        setTrips(response.data as Trip[]);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

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