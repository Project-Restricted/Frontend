import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { FilmPage } from './pages/FilmPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/film/:id" element={<FilmPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;