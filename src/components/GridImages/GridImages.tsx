import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { RemoveRedEye } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { CategoryPhotoObj } from '../store/searchSlice';

import styles from './GridImages.module.css';

type GridImagesProps = {
  forceBarDisplaying: boolean;
  onClickImgHandler: (id: string) => void;
};

export const GridImages: React.FC<GridImagesProps> = ({
  forceBarDisplaying,
  onClickImgHandler,
}) => {
  const [isHovered, setIsHovered] = useState<boolean | string>(false);
  const photosList = useAppSelector((state) => state.search.unsplashList);
  const statusAPI = useAppSelector((state) => state.search.status);

  const loaderArray: CategoryPhotoObj[] = [...Array(10)].map((_, index) => ({
    id: `${index}`,
    description: '',
    width: '',
    height: '',
    totalPhotos: 0,
    likes: 0,
    urls: { full: '', small: '', thumb: '' },
    tags: [{ title: '' }],
    author: { name: '', link: '' },
    imgCat: '',
    link: '',
  }));
  const data = statusAPI === 'idle' ? photosList : loaderArray;

  console.log('photosList', photosList);
  console.log('statusAPI', statusAPI);

  return (
    <>
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
                  src={obj?.imgCat ? obj.imgCat : obj.urls.small}
                  alt={obj.description}
                  loading='lazy'
                  onClick={() => onClickImgHandler(obj.id)}
                />
              )}
              {(isHovered === obj.id || forceBarDisplaying) && (
                <ImageListItemBar
                  sx={{ minHeight: '60px' }}
                  title={obj.description}
                  subtitle={
                    obj?.totalPhotos
                      ? `${obj.totalPhotos} Total photos`
                      : `${obj.likes} likes`
                  }
                  actionIcon={
                    <IconButton
                      onClick={() =>
                        console.log(`checking eye of ${obj.description}`)
                      }
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`${obj.description}`}
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
