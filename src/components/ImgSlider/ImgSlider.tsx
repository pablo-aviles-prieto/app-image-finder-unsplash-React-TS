import Slider from 'react-slick';
import Skeleton from '@mui/material/Skeleton';
import { ImgCard } from './ImgCard';
import { useAppSelector } from '../../app/hooks';

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

export const ImgSlider: React.FC<Props> = ({ dataArrayToPrint }) => {
  const statusAPI = useAppSelector((state) => state.search.status);
  const data = statusAPI === 'idle' ? dataArrayToPrint : loaderArray;

  return (
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
            key={item.id}
            img={item.urls.small}
            title={item.description}
          />
        )
      )}
    </Slider>
  );
};
