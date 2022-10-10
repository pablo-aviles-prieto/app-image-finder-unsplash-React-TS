import Slider from 'react-slick';
import Skeleton from '@mui/material/Skeleton';
import { ImgCard } from './ImgCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ImgSlider.module.css';

type loaderArrayType = {
  url: string;
  img: string;
  title: string;
}[];

const imgPlaceholder: { img: string; title: string; url: string }[] = [
  {
    img: `${process.env.PUBLIC_URL}bground.jpg`,
    title: 'Random image',
    url: '',
  },
  {
    img: `${process.env.PUBLIC_URL}bground1.jpg`,
    title: 'Random image1',
    url: '',
  },
  {
    img: `${process.env.PUBLIC_URL}bground2.jpg`,
    title: 'Random image2',
    url: '',
  },
  {
    img: `${process.env.PUBLIC_URL}bground3.jpg`,
    title: 'Random image3',
    url: '',
  },
  {
    img: `${process.env.PUBLIC_URL}bground4.jpg`,
    title: 'Random image4',
    url: '',
  },
];

const settings = {
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

export const ImgSlider: React.FC = () => {
  const loaderArray: loaderArrayType = [...Array(5)].map((_, index) => ({
    url: `${index}`,
    img: '',
    title: '',
  }));
  const data = false ? loaderArray : imgPlaceholder;

  return (
    <Slider className={styles.slider} {...settings}>
      {data.map((item) =>
        false ? (
          <Skeleton
            animation='wave'
            className={styles['placeholder-card']}
            key={item.url}
            variant='rectangular'
            height={230}
          />
        ) : (
          <ImgCard key={item.img} img={item.img} title={item.title} />
        )
      )}
    </Slider>
  );
};
