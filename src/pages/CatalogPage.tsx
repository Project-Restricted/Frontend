import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';

export const CatalogPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMovie = () => {
    console.log('Добавить фильм');
  };

  return (
    <>
      <Header 
        currentUser={null}
        onLoginClick={() => console.log('Вход')}
        onRegisterClick={() => console.log('Регистрация')}
        onLogoutClick={() => console.log('Выход')}
        onProfileClick={() => console.log('Профиль')}
      />
      
      <CatalogFilters
        selectedGenres={selectedGenres}
        onGenresChange={setSelectedGenres}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddMovie={handleAddMovie}
      />
      
      <div></div>
    </>
  );
};