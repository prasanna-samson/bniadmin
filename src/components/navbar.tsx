import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const pages = ['usercore', 'chapter', 'members'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('authToken'); // Check if user is logged in

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        color: '#333',
        fontFamily: 'Poppins',
        padding: { xs: '0.5rem', md: '0 2rem' },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#333' }} />
          <Typography
            variant="h5"
            noWrap
            fontFamily={'Poppins'}
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              letterSpacing: '.3rem',
              color: '#333',
              textDecoration: 'none',
            }}
          >
            BNI SA
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#333' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {isLoggedIn &&
                pages.map((page) => (
                  <MenuItem key={page} onClick={() => { navigate(`/${page}`); handleCloseNavMenu(); }}>
                    <Typography textAlign="center" sx={{ color: '#333' }}>{page}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#333' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#333',
              textDecoration: 'none',
            }}
          >
            BNI SA
          </Typography>

          {/* Desktop Navigation Links */}
          {isLoggedIn && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                gap: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${page}`)}
                  sx={{
                    my: 2,
                    color: '#333',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    transition: 'transform 0.2s ease-in-out, background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  color: '#fff',
                  '&:hover': {
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
