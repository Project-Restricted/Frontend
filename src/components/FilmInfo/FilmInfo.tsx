import { Paper, Box } from '@mui/material';
import type { FilmDetails } from '../../types/film';
import { filmInfoStyles } from './FilmInfo.styles';
import { FilmHeader } from './FilmHeader';
import { FilmTags } from './FilmTags';
import { FilmActors } from './FilmActors';
import { FilmRating } from './FilmRating';
import { FilmMeta } from './FilmMeta';

interface FilmInfoProps {
  film: FilmDetails;
}

export const FilmInfo = ({ film }: FilmInfoProps) => {
  return (
    <Paper sx={filmInfoStyles.paper}>
      <Box sx={filmInfoStyles.container}>
        <Box sx={filmInfoStyles.poster}>
          <img 
            src={film.posterUrl} 
            alt={film.title}
            style={{ 
              width: '100%', 
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.8)'
            }}
          />
        </Box>
        
        <Box sx={filmInfoStyles.content}>
          <FilmHeader 
            title={film.title}
            genres={film.genres}
          />
          
          <Box sx={{ mb: 4 }}>
            <FilmTags 
              tags={film.tags}
              onAddTag={() => console.log('Добавить тег')}
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <FilmActors actors={film.actors} />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <FilmRating 
              rating={film.rating}
              onRateClick={() => console.log('Оценить фильм')}
            />
          </Box>
          
          <FilmMeta 
            year={film.year}
            duration={film.duration}
            country={film.country}
            director={film.director}
            description={film.description}
          />
        </Box>
      </Box>
    </Paper>
  );
};