import { useMemo, useCallback } from 'react';
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
  inputValueFilter: string;
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
  inputValueFilter,
}) => {
  const favedPhotos = useAppSelector((state) => state.favourite.favedImages);
  const tags = useAppSelector((state) => state.favourite.tags);

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

  const renderingFilteredPhotos = useCallback(() => {
    return favedPhotos.filter(
      (objPhoto) => objPhoto?.tags && objPhoto.tags.includes(categorySelected)
    );
  }, [favedPhotos, categorySelected]);

  // const data = useMemo(
  //   () => (!categorySelected ? favedPhotos : renderingFilteredPhotos()),
  //   [categorySelected, favedPhotos]
  // );

  const filteringPhotosArray = useCallback(() => {
    const filteredByCategories = !categorySelected
      ? favedPhotos
      : renderingFilteredPhotos();
    return filteredByCategories.filter((objPhoto) => {
      if (objPhoto?.description) {
        return objPhoto?.description
          .toLowerCase()
          .includes(inputValueFilter.toLowerCase());
      }
    });
  }, [categorySelected, favedPhotos, inputValueFilter]);

  return (
    <Box className={styles['masonry-container']} sx={{ overflowY: 'inherit' }}>
      {filteringPhotosArray().length === 0 && (
        <h1
          style={{
            color: 'rgba(74, 50, 182, 0.993)',
            width: '90%',
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          Sorry, there are no favourite images saved!
        </h1>
      )}
      <ImageList variant='masonry' cols={2} gap={8}>
        {filteringPhotosArray().map((objPhoto) => (
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
