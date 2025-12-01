import { useState, type KeyboardEvent } from 'react';
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
import type { FilmSubmission } from '../../types/moderation';
import { ALL_GENRES } from '../../data';
import { addFilmModalStyles as styles } from './AddFilmModal.styles';

interface AddFilmModalProps {
  onClose: () => void;
  onSubmit?: (filmData: Omit<FilmSubmission, 'id'>) => void;
}

export const AddFilmModal = ({ onClose, onSubmit }: AddFilmModalProps) => {
  const [formData, setFormData] = useState<Omit<FilmSubmission, 'id'>>({
    title: '',
    posterUrl: '',
    country: '',
    year: new Date().getFullYear(),
    duration: 90,
    genres: [],
    tags: [],
    director: '',
    actors: [],
    description: '',
    videoUrl: '',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentActor, setCurrentActor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('=== Данные фильма ===');
    console.log('Название:', formData.title);
    console.log('Видео URL:', formData.videoUrl);
    console.log('Год:', formData.year);
    console.log('Длительность:', formData.duration);
    console.log('Жанры:', formData.genres);
    console.log('Теги:', formData.tags);
    console.log('Актёры:', formData.actors);
    console.log('Режиссёр:', formData.director);
    console.log('Страна:', formData.country);
    console.log('Постер URL:', formData.posterUrl);
    console.log('Описание:', formData.description);
    console.log('===================');
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
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

  const handleInputChange = (field: keyof typeof formData) => (
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
          label="Название фильма"
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
          value={formData.videoUrl}
          onChange={handleInputChange('videoUrl')}
          sx={styles.textField}
          fullWidth
          required
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

        <TextField
          label="Ссылка на постер"
          value={formData.posterUrl}
          onChange={handleInputChange('posterUrl')}
          sx={styles.textField}
          fullWidth
          disabled={isSubmitting}
          margin="normal"
          helperText="URL изображения обложки"
        />

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
          <InputLabel sx={styles.selectLabel}>Жанры</InputLabel>
          <Select
            multiple
            value={formData.genres}
            onChange={handleGenresChange}
            input={<OutlinedInput label="Жанры" />}
            disabled={isSubmitting}
            renderValue={(selected) => (
              <Box sx={styles.selectedValues}>
                {selected.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Выберите жанры...
                  </Typography>
                ) : (
                  selected.map((value) => (
                    <Chip key={value} label={value} sx={styles.chip} size="small" />
                  ))
                )}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                sx: styles.menuPaper,
              },
            }}
          >
            {ALL_GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
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
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить на модерацию'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};