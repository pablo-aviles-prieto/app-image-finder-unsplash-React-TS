import { useCallback } from 'react';
import {
  Skeleton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Pagination,
  Stack,
  Link,
} from '@mui/material';
import { RemoveRedEye, Favorite, PhotoCamera, Hd } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CategoryPhotoObj, fetchPhotos } from '../store/searchSlice';
import { fetchCategories } from '../../components/store/searchSlice';
import { replacingPageNumberInLink } from '../../utils/regex';

import styles from './GridImages.module.css';

type GridImagesProps = {
  forceBarDisplaying: boolean;
  onClickImgHandler: (id: string, url: string) => void;
  onClickFavIcon: (id: string) => void;
};

export const GridImages: React.FC<GridImagesProps> = ({
  forceBarDisplaying,
  onClickImgHandler,
  onClickFavIcon,
}) => {
  const photosList = useAppSelector((state) => state.search.unsplashData);
  const endpointCalled = useAppSelector((state) => state.search.endpointCalled);
  const statusAPI = useAppSelector((state) => state.search.status);
  const favedPhotos = useAppSelector((state) => state.favourite.favedImages);
  const dispatch = useAppDispatch();
  console.log('photosList', photosList);

  const checkingIfFaved = useCallback(
    (id: string) => {
      return favedPhotos.find((objPhoto) => objPhoto.id === id);
    },
    [favedPhotos]
  );

  const loaderArray: CategoryPhotoObj[] = [...Array(30)].map((_, index) => ({
    paginationInfo: { totalCount: 0, totalPages: 0 },
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
  const data = statusAPI === 'idle' ? photosList.parsedArray : loaderArray;

  return (
    <>
      <div
        style={{
          backgroundColor:
            data.length === 0
              ? 'rgba(172, 17, 5, 0.555)'
              : 'rgba(7, 148, 148, 0.452)',
          minHeight: '20rem',
        }}
        className={styles['grid-container']}
      >
        {data.length === 0 && (
          <h1
            style={{
              color: 'rgba(74, 50, 182, 0.993)',
              width: '90%',
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            Sorry, there are no images with the keywords/filters introduced!
          </h1>
        )}
        <ImageList cols={1}>
          {data.map((obj) => (
            <ImageListItem key={obj.id}>
              {!forceBarDisplaying && (
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={
                    obj?.author?.name ? (
                      <a
                        target='_blank'
                        id='author-head-title'
                        href={obj?.author?.link ? obj.author.link : '#'}
                      >
                        {obj.author.name}
                      </a>
                    ) : (
                      obj.description
                    )
                  }
                  position='top'
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      aria-label={`Photo by ${
                        obj?.author?.name ? obj?.author?.name : obj.description
                      }`}
                    >
                      <Link
                        href={obj?.author?.link ? obj.author.link : '#'}
                        color='inherit'
                      >
                        <PhotoCamera />
                      </Link>
                    </IconButton>
                  }
                  actionPosition='left'
                >
                  Text
                </ImageListItemBar>
              )}
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
                  onClick={() => onClickImgHandler(obj.id, obj?.urls?.small)}
                />
              )}
              <ImageListItemBar
                className={forceBarDisplaying ? 'override-opacity' : ''}
                sx={{ minHeight: '60px' }}
                title={obj.description}
                subtitle={
                  obj?.totalPhotos
                    ? `${obj.totalPhotos} Total photos`
                    : `${obj.likes} likes`
                }
                actionIcon={
                  <>
                    {!forceBarDisplaying && (
                      <IconButton
                        onClick={() =>
                          !checkingIfFaved(obj.id) && onClickFavIcon(obj.id)
                        }
                        sx={{
                          padding: '4px',
                        }}
                        aria-label={`${obj.description}`}
                      >
                        <Favorite
                          sx={{
                            color: checkingIfFaved(obj.id) ? 'red' : '#bdbdbd',
                          }}
                        />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => onClickImgHandler(obj.id, obj?.urls?.full)}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        padding: '4px',
                      }}
                      aria-label={`${obj.description}`}
                    >
                      {forceBarDisplaying ? <RemoveRedEye /> : <Hd />}
                    </IconButton>
                  </>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        {photosList.totalPages > 0 && (
          <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '2rem' }}>
            <Pagination
              count={photosList.totalPages}
              color='primary'
              size='large'
              // page={}
              siblingCount={1}
              onChange={(e, page) => {
                const parsedLink = replacingPageNumberInLink(
                  endpointCalled,
                  page
                );
                const isPhotosEndpoint = parsedLink.match(/photos/gi);
                isPhotosEndpoint
                  ? dispatch(
                      fetchPhotos({ url: parsedLink, updateTotalPages: false })
                    )
                  : dispatch(
                      fetchCategories({
                        url: parsedLink,
                        updateTotalPages: false,
                      })
                    );
                document
                  .getElementById('container-imgs-title')
                  ?.scrollIntoView();
              }}
            />
          </Stack>
        )}
      </div>
    </>
  );
};
