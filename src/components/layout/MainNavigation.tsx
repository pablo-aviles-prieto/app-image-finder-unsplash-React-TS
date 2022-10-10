import React from 'react';
import { Box, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Search, Favorite } from '@mui/icons-material';

export const MainNavigation: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <>
      <Box component='nav' sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{
            bgcolor: 'transparent',
            px: { xs: '1rem', md: '5rem' },
            boxShadow: 'inset 0px -41px 34px -30px rgba(0 0 0 / 0.35)',
          }}
        >
          <Toolbar sx={{ px: '0' }}>
            <Typography
              fontSize={{ xs: '2rem', sm: '2.5rem', md: '3rem' }}
              component='h2'
              sx={{ flexGrow: 1 }}
            >
              StorIMG
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '1rem', sm: '3rem' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='fav'
                >
                  <Favorite
                    sx={{
                      width: { xs: '2rem', sm: '2.5rem', md: '2.5rem' },
                      height: { xs: '2rem', sm: '2.5rem', md: '2.5rem' },
                    }}
                  />
                </IconButton>
                <Typography
                  fontSize={{ sm: '1.3rem', md: '1.6rem', lg: '2rem' }}
                  component='h3'
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Favorites
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='search'
                >
                  <Search
                    sx={{
                      width: { xs: '2rem', sm: '2.5rem', md: '2.5rem' },
                      height: { xs: '2rem', sm: '2.5rem', md: '2.5rem' },
                    }}
                  />
                </IconButton>
                <Typography
                  fontSize={{ sm: '1.3rem', md: '1.6rem', lg: '2rem' }}
                  component='h3'
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Search
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>{props.children}</div>
    </>
  );
};
