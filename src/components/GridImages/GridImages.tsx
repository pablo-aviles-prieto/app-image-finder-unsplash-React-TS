import {
  Skeleton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Pagination,
  Stack,
} from '@mui/material';
import { RemoveRedEye, Favorite } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CategoryPhotoObj, fetchPhotos } from '../store/searchSlice';
import { fetchCategories } from '../../components/store/searchSlice';
import { replacingPageNumberInLink } from '../../utils/regex';

import styles from './GridImages.module.css';

type GridImagesProps = {
  forceBarDisplaying: boolean;
  onClickImgHandler: (id: string) => void;
};

export const GridImages: React.FC<GridImagesProps> = ({
  forceBarDisplaying,
  onClickImgHandler,
}) => {
  const photosList = useAppSelector((state) => state.search.unsplashData);
  const endpointCalled = useAppSelector((state) => state.search.endpointCalled);
  const statusAPI = useAppSelector((state) => state.search.status);
  const dispatch = useAppDispatch();
  console.log('photosList', photosList);

  const loaderArray: CategoryPhotoObj[] = [...Array(10)].map((_, index) => ({
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
      <div className={styles['grid-container']}>
        <ImageList cols={1}>
          {data.map((obj) => (
            <ImageListItem key={obj.id}>
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
                        onClick={() => console.log('check')}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.54)',
                          padding: '4px',
                        }}
                        aria-label={`${obj.description}`}
                      >
                        <Favorite />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => onClickImgHandler(obj.id)}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.54)',
                        padding: '4px',
                      }}
                      aria-label={`${obj.description}`}
                    >
                      <RemoveRedEye />
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
              siblingCount={2}
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
              }}
            />
          </Stack>
        )}
      </div>
    </>
  );
};
