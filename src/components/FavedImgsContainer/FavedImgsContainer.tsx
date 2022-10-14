import { ImageSearch, Favorite, Image, ArrowRight } from '@mui/icons-material';
import { ImgSlider, MainContainer, MainContainerCard } from '../';

import styles from './FavedImgsContainer.module.css';

export const FavedImgsContainer: React.FC = () => {
  const hasFavImgs = true;

  return (
    <>
      {hasFavImgs ? (
        <>
          <p className={styles['faved-title']}>Your fav'ed images</p>
          <ImgSlider />
        </>
      ) : (
        <div className={styles['no-faved-imgs']}>
          <h2>You can search and save your favourite images!</h2>
          <p>Your favourited images will be showcased right here</p>
          <div className={styles['no-faved-imgs-icons']}>
            <ImageSearch
              sx={{
                width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            />
            <ArrowRight />
            <Favorite
              sx={{
                width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            />
            <ArrowRight />
            <Image
              sx={{
                width: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                height: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
