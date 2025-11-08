import { Box, Typography, Chip, Button } from '@mui/material';
import { Add, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useState } from 'react';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmTagsProps {
  tags: string[];
  onAddTag: () => void;
}

export const FilmTags = ({ tags, onAddTag }: FilmTagsProps) => {
  const [showAllTags, setShowAllTags] = useState(false);
  
  const visibleTagsCount = 6;
  const visibleTags = showAllTags ? tags : tags.slice(0, visibleTagsCount);
  const hasHiddenTags = tags.length > visibleTagsCount;

  const toggleTagsVisibility = () => {
    setShowAllTags(!showAllTags);
  };

  return (
    <Box sx={filmInfoStyles.tagsSection}>
      <Box sx={filmInfoStyles.tagsHeader}>
        <Typography variant="h6" sx={filmInfoStyles.tagsTitle}>
          Теги:
        </Typography>
        <Button
          startIcon={<Add />}
          onClick={onAddTag}
          size="small"
          sx={filmInfoStyles.addTagButton}
        >
          Добавить тег
        </Button>
      </Box>

      <Box sx={[
        filmInfoStyles.tagsContainer,
        showAllTags && filmInfoStyles.tagsContainerExpanded
      ]}>
        {visibleTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            sx={filmInfoStyles.tagChip}
          />
        ))}
      </Box>

      {hasHiddenTags && (
        <Button
          onClick={toggleTagsVisibility}
          endIcon={showAllTags ? <ExpandLess /> : <ExpandMore />}
          sx={filmInfoStyles.showMoreButton}
        >
          {showAllTags ? 'Скрыть' : `Показать все (${tags.length})`}
        </Button>
      )}
    </Box>
  );
};