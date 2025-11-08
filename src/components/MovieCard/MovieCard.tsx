import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { FilmPreview } from '../../types/film';
import { movieCardStyles } from './MovieCard.styles';
import { MovieCardImage } from './MovieCardImage';
import { MovieCardContent } from './MovieCardContent';

interface MovieCardProps {
  film: FilmPreview;
}

export const MovieCard = ({ film }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <Card sx={movieCardStyles.card} onClick={handleClick}>
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