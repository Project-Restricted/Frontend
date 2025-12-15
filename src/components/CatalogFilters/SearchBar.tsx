import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { catalogFiltersStyles } from './CatalogFilters.styles';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
}

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange,
  onSearchSubmit
}: SearchBarProps) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      e.preventDefault();
      onSearchSubmit();
    }
  };

  return (
    <TextField
      placeholder="Поиск фильмов..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      onKeyDown={handleKeyDown}
      size="small"
      sx={catalogFiltersStyles.searchField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: '#ffffff' }} />
          </InputAdornment>
        ),
      }}
    />
  );
};