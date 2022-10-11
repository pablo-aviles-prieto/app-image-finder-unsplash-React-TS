import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Favorite } from '@mui/icons-material';

import styles from './GridImages.module.css';

type loaderArrayType = {
  img: string;
  title: string;
  author: string;
  rows: number;
  cols: number;
  featured: boolean;
}[];

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
  {
    img: `${process.env.PUBLIC_URL}bground.jpg`,
    title: 'Bike0',
    author: '@southside_customs',
  },
  {
    img: `${process.env.PUBLIC_URL}bground1.jpg`,
    title: 'Bike1',
    author: '@southside_customs',
  },
  {
    img: `${process.env.PUBLIC_URL}bground2.jpg`,
    title: 'Bike2',
    author: '@southside_customs',
  },
  {
    img: `${process.env.PUBLIC_URL}bground3.jpg`,
    title: 'Bike3',
    author: '@southside_customs',
  },
  {
    img: `${process.env.PUBLIC_URL}bground4.jpg`,
    title: 'Bike4',
    author: '@southside_customs',
  },
];

export const GridImages: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean | string>(false);
  const isLoading = false;

  const loaderArray: loaderArrayType = [...Array(10)].map((_, index) => ({
    img: `${index}`,
    title: '',
    author: '',
    rows: 2,
    cols: 1,
    featured: false,
  }));
  const data = isLoading ? loaderArray : itemData;

  return (
    <>
      <div className={styles['grid-container-title']}>
        <h2>Looking for some amazing pics?</h2>
      </div>
      <div className={styles['grid-container']}>
        <ImageList cols={1}>
          {data.map((item) => (
            <ImageListItem
              key={item.img}
              onMouseEnter={() => setIsHovered(item.img)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isLoading ? (
                <Skeleton
                  height={220}
                  variant='rectangular'
                  width='100%'
                  className={styles['placeholder-card-grid']}
                />
              ) : (
                <img
                  src={item.img}
                  srcSet={item.img}
                  alt={item.title}
                  loading='lazy'
                />
              )}
              {isHovered !== item.img && (
                <ImageListItemBar
                  sx={{ minHeight: '60px' }}
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`Fav ${item.title}`}
                    >
                      <Favorite />
                    </IconButton>
                  }
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
};
