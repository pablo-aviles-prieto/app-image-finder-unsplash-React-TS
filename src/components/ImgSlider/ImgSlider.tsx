import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Skeleton from '@mui/material/Skeleton';
import { ImgCard } from './ImgCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CategoryPhotoObj } from '../store/searchSlice';
import {
  deleteFavedImgReducer,
  updateImgDescription,
} from '../store/favouriteSlice';
import {
  switchModalStateReducer,
  addPhotoModalReducer,
  setTrueDescriptionReducer,
} from '../store/modalSlice';
import { ModalBackdrop, ImageInfoModal } from '../index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ImgSlider.module.css';

type loaderArrayType = {
  id: string;
  url: string;
  img: string;
  title: string;
}[];

type Props = {
  dataArrayToPrint: any[];
};

const sliderSettings = {
  infinite: true,
  speed: 500,
  arrows: true,
  autoplay: true,
  swipeToSlide: true,
  slidesToScroll: 1,
};

const loaderArray: loaderArrayType = [...Array(5)].map((_, index) => ({
  id: `${index}`,
  url: `${index}`,
  img: '',
  title: '',
}));

export const ImgSlider: React.FC<Props> = ({ dataArrayToPrint }) => {
  const favedImgs = useAppSelector((state) => state.favourite.favedImages);
  const imgDisplayedModal = useAppSelector((state) => state.modal.imgToDisplay);
  const statusAPI = useAppSelector((state) => state.search.status);
  const dispatch = useAppDispatch();

  const data = statusAPI === 'idle' ? dataArrayToPrint : loaderArray;

  const switchModalState = () => {
    dispatch(switchModalStateReducer());
  };

  const clickImgHandler = (id: string, url: string) => {
    const photoObjToFav = favedImgs.find((photoObj) => photoObj.id === id);
    dispatch(setTrueDescriptionReducer());
    dispatch(
      addPhotoModalReducer({
        imgToDisplay: photoObjToFav,
        url: url,
        state: true,
      })
    );
  };

  const submitModalFormHandler = (e: React.FormEvent, inputValue: string) => {
    e.preventDefault();
    const checkDuplicity = favedImgs.find(
      (obj) => obj.id === imgDisplayedModal.id
    );
    const checkNewDescription =
      checkDuplicity?.description === inputValue ? false : true;
    if (checkDuplicity && (!inputValue.trim() || !checkNewDescription)) {
      alert('Insert a new valid description!');
      return;
    }

    if (checkDuplicity && checkNewDescription) {
      alert('Description updated!');
      dispatch(
        updateImgDescription({
          id: imgDisplayedModal.id,
          description: inputValue,
        })
      );
      switchModalState();
      return;
    }
  };

  const deletingPhotoFromSaved = (id: string) => {
    const checkDuplicity = favedImgs.find(
      (obj) => obj.id === imgDisplayedModal.id
    );
    if (checkDuplicity) {
      dispatch(switchModalStateReducer());
      dispatch(deleteFavedImgReducer(id));
    } else {
      return;
    }
  };

  return (
    <>
      <Slider
        slidesToShow={data.length > 2 ? 3 : data.length === 2 ? 2 : 1}
        responsive={[
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: data.length > 1 ? 2 : 1,
            },
          },
        ]}
        className={styles.slider}
        {...sliderSettings}
      >
        {data.map((item) =>
          statusAPI !== 'idle' ? (
            <Skeleton
              animation='wave'
              className={styles['placeholder-card']}
              key={item.id}
              variant='rectangular'
              height={230}
            />
          ) : (
            <ImgCard
              id={item.id}
              key={item.id}
              img={item.urls.small}
              title={item.description}
              onImgClick={clickImgHandler}
            />
          )
        )}
      </Slider>
      <ModalBackdrop handlingModal={switchModalState}>
        <ImageInfoModal
          onSubmitFormHandler={submitModalFormHandler}
          onDeleteFavBtn={deletingPhotoFromSaved}
        />
      </ModalBackdrop>
    </>
  );
};
