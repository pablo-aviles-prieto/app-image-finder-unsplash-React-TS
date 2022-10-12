import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { RemoveRedEye } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { CategoryObj } from '../store/searchSlice';

import styles from './GridImages.module.css';

export const GridImages: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean | string>(false);
  const photosList = useAppSelector((state) => state.search.photoList);
  const statusAPI = useAppSelector((state) => state.search.status);

  const loaderArray: CategoryObj[] = [...Array(10)].map((_, index) => ({
    id: `${index}`,
    title: '',
    totalPhotos: 0,
    tags: [{ title: '' }],
    imgUrl: '',
    link: '',
  }));
  const data = statusAPI === 'idle' ? photosList : loaderArray;  

  return (
    <>
      <div className={styles['grid-container-title']}>
        <h2>Looking for some amazing pics?</h2>
      </div>
      <div className={styles['grid-container']}>
        <ImageList cols={1}>
          {data.map((obj) => (
            <ImageListItem
              key={obj.id}
              onMouseEnter={() => setIsHovered(obj.id)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {statusAPI !== 'idle' ? (
                <Skeleton
                  height={320}
                  variant='rectangular'
                  width='100%'
                  className={styles['placeholder-card-grid']}
                />
              ) : (
                <img
                  src={obj.imgUrl}
                  srcSet={obj.imgUrl}
                  alt={obj.title}
                  loading='lazy'
                  onClick={() => {console.log('link', obj.link)}}
                />
              )}
              {isHovered !== obj.id && (
                <ImageListItemBar
                  sx={{ minHeight: '60px' }}
                  title={obj.title}
                  subtitle={`${obj.totalPhotos} Total photos`}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`Fav ${obj.title}`}
                    >
                      <RemoveRedEye />
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
