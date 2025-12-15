import { useState, type KeyboardEvent, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  type SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { addFilmModalStyles as styles } from './AddFilmModal.styles';
import { API_CONFIG, ENDPOINTS } from '../../config/constants';

interface Genre {
  id: number;
  name: string;
}

interface FilmFormData {
  title: string;
  description: string;
  year: number;
  video_url: string;
  duration: number;
  genres: string[];
  tags: string[];
  director: string;
  actors: string[];
  country: string;
  poster: File | null;
}

interface AddFilmModalProps {
  onClose: () => void;
  onSubmit?: (formData: FormData) => void;
}

export const AddFilmModal = ({ onClose, onSubmit }: AddFilmModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FilmFormData>({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    video_url: '',
    duration: 90,
    genres: [],
    tags: [],
    director: '',
    actors: [],
    country: '',
    poster: null,
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentActor, setCurrentActor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoadingGenres(true);
        const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.MOVIE_GENRES}`);
        
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        
        const data: Genre[] = await response.json();
        setGenres(data);
      } catch (err: any) {
        console.error('Ошибка загрузки жанров:', err);
        setGenres([]);
      } finally {
        setLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        const formDataToSend = new FormData();
        
        formDataToSend.append('title', formData.title);
        
        if (formData.description) {
          formDataToSend.append('description', formData.description);
        }
        
        if (formData.year) {
          formDataToSend.append('year', formData.year.toString());
        }
        
        if (formData.video_url) {
          formDataToSend.append('video_url', formData.video_url);
        }
        
        if (formData.duration) {
          formDataToSend.append('duration', formData.duration.toString());
        }
        
        formData.genres.forEach(genreId => {
          formDataToSend.append('genres', genreId);
        });
        
        formData.tags.forEach(tag => {
          formDataToSend.append('tags', tag);
        });
        
        if (formData.director) {
          formDataToSend.append('director', formData.director);
        }
        
        formData.actors.forEach(actor => {
          formDataToSend.append('actors', actor);
        });
        
        if (formData.country) {
          formDataToSend.append('country', formData.country);
        }
        
        if (formData.poster) {
          formDataToSend.append('poster', formData.poster);
        }
        
        await onSubmit(formDataToSend);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Фильм отправлен на модерацию! (демо)');
      }
      
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Ошибка при отправке фильма');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FilmFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'year' || field === 'duration' ? Number(value) || 0 : value,
    }));
  };

  const handleGenresChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      genres: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        poster: e.target.files![0],
      }));
    }
  };

  const handleAddTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setCurrentTag('');
    }
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleAddActor = () => {
    const trimmedActor = currentActor.trim();
    if (trimmedActor && !formData.actors.includes(trimmedActor)) {
      setFormData(prev => ({
        ...prev,
        actors: [...prev.actors, trimmedActor],
      }));
      setCurrentActor('');
    }
  };

  const handleActorKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddActor();
    }
  };

  const handleRemoveActor = (actorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      actors: prev.actors.filter(actor => actor !== actorToRemove),
    }));
  };

  return (
    <Box sx={styles.formContainer}>
      <Box sx={styles.header}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Предложить фильм
        </Typography>
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Название фильма *"
          value={formData.title}
          onChange={handleInputChange('title')}
          sx={styles.textField}
          fullWidth
          required
          disabled={isSubmitting}
          margin="normal"
        />

        <TextField
          label="Ссылка на видео"
          value={formData.video_url}
          onChange={handleInputChange('video_url')}
          sx={styles.textField}
          fullWidth
          disabled={isSubmitting}
          margin="normal"
          helperText="YouTube, VK, Rutube и другие легальные источники"
        />

        <Box sx={styles.row}>
          <TextField
            label="Год выпуска"
            type="number"
            value={formData.year}
            onChange={handleInputChange('year')}
            sx={styles.textField}
            fullWidth
            disabled={isSubmitting}
            margin="normal"
            inputProps={{ min: 1888, max: new Date().getFullYear() }}
          />
          <TextField
            label="Продолжительность (мин)"
            type="number"
            value={formData.duration}
            onChange={handleInputChange('duration')}
            sx={styles.textField}
            fullWidth
            disabled={isSubmitting}
            margin="normal"
            inputProps={{ min: 1 }}
          />
        </Box>

        <Box sx={styles.fieldContainer}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Постер фильма
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
            sx={styles.textField}
            fullWidth
          >
            {formData.poster ? formData.poster.name : 'Выберите файл постера'}
          </Button>
          {formData.poster && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption">
                Выбран: {formData.poster.name} ({(formData.poster.size / 1024).toFixed(1)} KB)
              </Typography>
              <Button
                size="small"
                onClick={() => setFormData(prev => ({ ...prev, poster: null }))}
              >
                Удалить
              </Button>
            </Box>
          )}
        </Box>

        <TextField
          label="Режиссёр"
          value={formData.director}
          onChange={handleInputChange('director')}
          sx={styles.textField}
          fullWidth
          disabled={isSubmitting}
          margin="normal"
        />

        <Box sx={styles.fieldContainer}>
          <Box sx={styles.chipInputContainer}>
            <TextField
              value={currentActor}
              onChange={(e) => setCurrentActor(e.target.value)}
              onKeyPress={handleActorKeyPress}
              sx={styles.textField}
              label="Актёры"
              placeholder="Введите имя актёра и нажмите Enter"
              disabled={isSubmitting}
              fullWidth
              margin="normal"
              helperText="Введите имя и нажмите Enter или кнопку +"
            />
            <Button
              onClick={handleAddActor}
              variant="outlined"
              sx={styles.addButton}
              disabled={isSubmitting || !currentActor.trim()}
              title="Добавить актёра"
            >
              <AddIcon />
            </Button>
          </Box>
          {formData.actors.length > 0 && (
            <Box sx={styles.chipContainer}>
              {formData.actors.map((actor) => (
                <Chip
                  key={actor}
                  label={actor}
                  onDelete={() => handleRemoveActor(actor)}
                  sx={styles.chip}
                  size="medium"
                />
              ))}
            </Box>
          )}
        </Box>

        <FormControl fullWidth sx={styles.selectField}>
          <InputLabel sx={styles.selectLabel}>
            {loadingGenres ? 'Загрузка жанров...' : 'Жанры'}
          </InputLabel>
          <Select
            multiple
            value={formData.genres}
            onChange={handleGenresChange}
            input={<OutlinedInput label={loadingGenres ? 'Загрузка жанров...' : 'Жанры'} />}
            disabled={isSubmitting || loadingGenres}
            renderValue={(selected) => (
              <Box sx={styles.selectedValues}>
                {selected.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    {loadingGenres ? 'Загрузка...' : 'Выберите жанры...'}
                  </Typography>
                ) : (
                  selected.map((genreId) => {
                    const genre = genres.find(g => g.id.toString() === genreId);
                    return <Chip key={genreId} label={genre?.name || genreId} sx={styles.chip} size="small" />;
                  })
                )}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                sx: styles.menuPaper,
              },
            }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={styles.fieldContainer}>
          <Box sx={styles.chipInputContainer}>
            <TextField
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleTagKeyPress}
              sx={styles.textField}
              label="Теги"
              placeholder="Введите тег и нажмите Enter"
              disabled={isSubmitting}
              fullWidth
              margin="normal"
              helperText="Введите тег и нажмите Enter или кнопку +"
            />
            <Button
              onClick={handleAddTag}
              variant="outlined"
              sx={styles.addButton}
              disabled={isSubmitting || !currentTag.trim()}
              title="Добавить тег"
            >
              <AddIcon />
            </Button>
          </Box>
          {formData.tags.length > 0 && (
            <Box sx={styles.chipContainer}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={styles.tagChip}
                  size="medium"
                />
              ))}
            </Box>
          )}
        </Box>

        <TextField
          label="Страна"
          value={formData.country}
          onChange={handleInputChange('country')}
          sx={styles.textField}
          fullWidth
          disabled={isSubmitting}
          margin="normal"
        />

        <TextField
          label="Описание"
          value={formData.description}
          onChange={handleInputChange('description')}
          sx={styles.textField}
          fullWidth
          multiline
          rows={4}
          disabled={isSubmitting}
          margin="normal"
        />

        <Box sx={styles.actions}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={styles.cancelButton}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={styles.submitButton}
            disabled={isSubmitting || !formData.title.trim()}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить на модерацию'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};