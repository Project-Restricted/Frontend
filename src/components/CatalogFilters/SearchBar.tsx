import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { catalogFiltersStyles } from './CatalogFilters.styles';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <TextField
      placeholder="Поиск фильмов..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
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