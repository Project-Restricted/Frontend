import { Box, Typography } from '@mui/material';
import { Email, CalendarToday } from '@mui/icons-material';
import { profileStyles } from './Profile.styles';

interface ProfileInfoProps {
  email: string;
  joinedDaysAgo: number;
  isModerator?: boolean;
}

export const ProfileInfo = ({ email, joinedDaysAgo }: ProfileInfoProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={profileStyles.infoItem}>
        <Email sx={{ color: 'primary.main' }} />
        <Typography variant="h6" color="white">
          {email}
        </Typography>
      </Box>

      <Box sx={profileStyles.infoItem}>
        <CalendarToday sx={{ color: 'primary.main' }} />
        <Typography variant="h6" color="white">
          На сайте {joinedDaysAgo} дней
        </Typography>
      </Box>
    </Box>
  );
};