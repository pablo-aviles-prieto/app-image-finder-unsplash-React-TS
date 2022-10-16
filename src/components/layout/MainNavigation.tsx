import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Search, Favorite } from '@mui/icons-material';

import styles from './MainNavigation.module.css';

export const MainNavigation: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <>
      <Box component='nav' sx={{ flexGrow: 1, marginBottom: '4rem' }}>
        <AppBar
          position='static'
          sx={{
            bgcolor: 'transparent',
            px: { xs: '1rem', md: '5rem' },
            boxShadow: 'inset 0px -41px 34px -30px rgba(0 0 0 / 0.35)',
          }}
        >
          <Toolbar sx={{ px: '0' }}>
            <div className={styles['logo-container']}>
              <NavLink className={styles['restore-style']} to='/home'>
                <Typography
                  fontSize={{ xs: '2rem', sm: '2.5rem', md: '3rem' }}
                  component='span'
                  sx={{
                    flexGrow: 1,
                    textShadow: '0px 0px 17px rgba(9, 128, 226, 0.9)',
                  }}
                >
                  StorIMG
                </Typography>
              </NavLink>
            </div>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '1rem', sm: '3rem' },
              }}
            >
              <NavLink className={styles['restore-style']} to='/favourites'>
                <Box
                  className={styles['fav-box']}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: { sm: '153px', md: '180px', lg: '205px' },
                  }}
                >
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
                    sx={{
                      flexGrow: 1,
                      display: { xs: 'none', sm: 'block' },
                      textShadow: '0px 0px 17px rgba(9, 128, 226, 0.9)',
                    }}
                  >
                    My photos
                  </Typography>
                </Box>
              </NavLink>
              <NavLink className={styles['restore-style']} to='/search'>
                <Box
                  className={styles['search-box']}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='search'
                  >
                    <Search
                      sx={{
                        width: { xs: '2rem', sm: '2.5rem' },
                        height: { xs: '2rem', sm: '2.5rem' },
                      }}
                    />
                  </IconButton>
                  <Typography
                    fontSize={{ sm: '1.3rem', md: '1.6rem', lg: '2rem' }}
                    component='h3'
                    sx={{
                      flexGrow: 1,
                      display: { xs: 'none', sm: 'block' },
                      textShadow: '0px 0px 17px rgba(9, 128, 226, 0.9)',
                    }}
                  >
                    Search
                  </Typography>
                </Box>
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>{props.children}</div>
    </>
  );
};
