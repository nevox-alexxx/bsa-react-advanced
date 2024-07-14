import React, { useState } from 'react';
import '../assets/css/style.css';

interface FiltersProps {
  onFilterChange: (
    filters: { 
      search: string, 
      duration: string, 
      level: string 
    }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, duration, level });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value);
    onFilterChange({ search, duration: e.target.value, level });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
    onFilterChange({ search, duration, level: e.target.value });
  };

  return (
    <section className="trips-filter">
      <h2 className="visually-hidden">Trips filter</h2>
      <form className="trips-filter__form" autoComplete="off">
        <label className="trips-filter__search input">
          <span className="visually-hidden">Search by name</span>
          <input
            data-test-id="filter-search"
            name="search"
            type="search"
            placeholder="search by title"
            value={search}
            onChange={handleSearchChange}
          />
        </label>

        <label className="select">
          <span className="visually-hidden">Search by duration</span>
          <select 
            data-test-id="filter-duration" 
            name="duration" value={duration} 
            onChange={handleDurationChange}>

            <option value="">duration</option>
            <option value="0_5">&lt; 5 days</option>
            <option value="5_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>

        <label className="select">
          <span className="visually-hidden">Search by level</span>
          <select 
            data-test-id="filter-level" 
            name="level" value={level} 
            onChange={handleLevelChange}
            >
            <option value="">level</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
}