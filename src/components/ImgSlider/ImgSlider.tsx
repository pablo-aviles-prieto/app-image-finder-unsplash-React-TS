import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Skeleton from '@mui/material/Skeleton';
import { ImgCard } from './ImgCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CategoryPhotoObj } from '../store/searchSlice';
import {
  addImgToFavReducer,
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
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  autoplay: true,
  swipeToSlide: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 767,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 2 },
    },
  ],
};

const loaderArray: loaderArrayType = [...Array(5)].map((_, index) => ({
  id: `${index}`,
  url: `${index}`,
  img: '',
  title: '',
}));

type ModalData = {
  data: CategoryPhotoObj;
  url: string;
  state: boolean;
};

const initState = {
  data: {
    id: ``,
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
  },
  url: '',
  state: false,
};

export const ImgSlider: React.FC<Props> = ({ dataArrayToPrint }) => {
  // const [modalState, setModalState] = useState<ModalData>(initState);
  const photoList = useAppSelector((state) => state.search.unsplashData);
  const favedImgs = useAppSelector((state) => state.favourite.favedImages);
  const imgDisplayedModal = useAppSelector((state) => state.modal.imgToDisplay);
  const statusAPI = useAppSelector((state) => state.search.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const data = statusAPI === 'idle' ? dataArrayToPrint : loaderArray;
  console.log('data', data);

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
      alert('Photo already saved in favs!');
      switchModalState();
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

    const enteredDescription = inputValue;
    if (enteredDescription.trim()) {
      const newObj = { ...imgDisplayedModal };
      newObj.description = enteredDescription;
      dispatch(addImgToFavReducer(newObj));
      switchModalState();
      navigate(`/favourites`);
    } else {
      dispatch(addImgToFavReducer(imgDisplayedModal));
      switchModalState();
      navigate(`/favourites`);
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
      <Slider className={styles.slider} {...sliderSettings}>
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
      <ModalBackdrop
        handlingModal={switchModalState}
      >
        <ImageInfoModal
          onSubmitFormHandler={submitModalFormHandler}
          onDeleteFavBtn={deletingPhotoFromSaved}
        />
      </ModalBackdrop>
    </>
  );
};
