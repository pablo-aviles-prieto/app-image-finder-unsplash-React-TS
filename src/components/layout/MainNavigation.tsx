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
            bgcolor: 'white',
            px: { xs: '1rem', md: '5rem' },
            boxShadow: '0px 0px 9px 10px rgb(255 255 255)',
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
                    color: 'rgba(2, 101, 182, 0.864)',
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
                    color='primary'
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
                      color: 'rgba(2, 101, 182, 0.864)',
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
                    color='primary'
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
                      color: 'rgba(2, 101, 182, 0.864)',
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
