import { useMemo } from 'react';
import {
  ImageListItem,
  ImageListItemBar,
  ImageList,
  Box,
  IconButton,
  Chip,
} from '@mui/material/';
import { Hd } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';

import styles from './GridImagesMasonry.module.css';

type Props = {
  onClickImgHandler: (id: string, hdUrl: string) => void;
  categoryColorObj: { [key: string]: string };
  categorySelected: string;
};

interface PhotoObj {
  id: string;
  description: string | undefined;
  width: string;
  height: string;
  totalPhotos: Number | undefined;
  likes: number;
  urls: {
    full: string;
    small: string;
    thumb: string;
  };
  tags: string[];
  author: {
    name: string | null;
    link: string | null;
  };
  imgCat: string;
  link: string;
}

export const GridImagesMasonry: React.FC<Props> = ({
  onClickImgHandler,
  categoryColorObj,
  categorySelected,
}) => {
  const favedPhotos = useAppSelector((state) => state.favourite.favedImages);
  const tags = useAppSelector((state) => state.favourite.tags);
  console.log('categorySelected', categorySelected);

  const renderingCategories = (objPhoto: PhotoObj) => {
    return tags.map((tag) => {
      const checkingForTag = objPhoto?.tags.find(
        (tagObjPhoto: string) => tagObjPhoto === tag
      );
      if (checkingForTag) {
        return (
          <Chip
            size='small'
            key={tag}
            label={tag}
            style={{
              marginLeft: '0',
              fontWeight: '700',
              marginRight: '0.4rem',
              marginBottom: '0.3rem',
              backgroundColor: categoryColorObj[tag],
              minWidth: '3rem',
            }}
          />
        );
      }
    });
  };

  const renderingFilteredPhotos = () => {
    const newArr = favedPhotos.filter(
      (objPhoto) => objPhoto?.tags && objPhoto.tags.includes(categorySelected)
    );
    console.log('newArr', newArr);
    return newArr;
  };

  const data = useMemo(
    () => (!categorySelected ? favedPhotos : renderingFilteredPhotos()),
    [categorySelected, favedPhotos]
  );
  console.log('data', data);

  return (
    <Box className={styles['masonry-container']} sx={{ overflowY: 'inherit' }}>
      <ImageList variant='masonry' cols={2} gap={8}>
        {data.map((objPhoto) => (
          <ImageListItem
            key={objPhoto.id}
            className={styles['grid-masonry-list']}
          >
            {objPhoto?.tags && objPhoto?.tags.length > 0 && (
              <div className={styles['chips-inside-photos']}>
                {renderingCategories(objPhoto)}
              </div>
            )}
            <img
              onClick={() =>
                onClickImgHandler(objPhoto.id, objPhoto.urls.small)
              }
              src={objPhoto.urls.small}
              srcSet={objPhoto.urls.small}
              alt={objPhoto.description}
              loading='lazy'
            />
            <ImageListItemBar
              sx={{ minHeight: '60px' }}
              title={objPhoto.description}
              subtitle={`${objPhoto.likes} likes`}
              actionIcon={
                <>
                  <IconButton
                    onClick={() =>
                      onClickImgHandler(objPhoto.id, objPhoto.urls.full)
                    }
                    sx={{
                      color: 'rgba(255, 255, 255, 0.54)',
                      padding: '4px',
                    }}
                    aria-label={objPhoto.description}
                  >
                    <Hd />
                  </IconButton>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
