import { Card } from '@mui/material';
import type { FilmPreview } from '../../types/film';
import { movieCardStyles } from './MovieCard.styles';
import { MovieCardImage } from './MovieCardImage';
import { MovieCardContent } from './MovieCardContent';

interface MovieCardProps {
  film: FilmPreview;
  onClick?: () => void;
}

export const MovieCard = ({ film, onClick }: MovieCardProps) => {
  return (
    <Card sx={movieCardStyles.card} onClick={onClick}>
      <MovieCardImage 
        posterUrl={film.posterUrl}
        title={film.title}
        rating={film.rating}
      />
      <MovieCardContent 
        title={film.title}
        year={film.year}
        duration={film.duration}
        genres={film.genres}
      />
    </Card>
  );
};