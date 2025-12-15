import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { catalogFiltersStyles } from './CatalogFilters.styles';
import { GenreFilter } from './GenreFilter';
import { SearchBar } from './SearchBar';

interface CatalogFiltersProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
  onAddMovie?: () => void;
}

export const CatalogFilters = ({
  selectedGenres,
  onGenresChange,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onAddMovie
}: CatalogFiltersProps) => {
  return (
    <Box sx={catalogFiltersStyles.root}>
      <Box sx={catalogFiltersStyles.container}>
        <Box sx={catalogFiltersStyles.topRow}>
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenresChange={onGenresChange}
          />

          <Button
            startIcon={<Add />}
            onClick={onAddMovie}
            variant="outlined"
            sx={catalogFiltersStyles.addButton}
          >
            Добавить свой фильм
          </Button>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
          />
        </Box>
      </Box>
    </Box>
  );
};