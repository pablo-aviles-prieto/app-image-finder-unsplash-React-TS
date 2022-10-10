import Slider from 'react-slick';
import { ImgCard } from './ImgCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ImgSlider.module.css'

const imgPlaceholder: { img: string; title: string }[] = [
  {
    img: `${process.env.PUBLIC_URL}bground.jpg`,
    title: 'Random image',
  },
  {
    img: `${process.env.PUBLIC_URL}bground1.jpg`,
    title: 'Random image1',
  },
  {
    img: `${process.env.PUBLIC_URL}bground2.jpg`,
    title: 'Random image2',
  },
  {
    img: `${process.env.PUBLIC_URL}bground3.jpg`,
    title: 'Random image3',
  },
  {
    img: `${process.env.PUBLIC_URL}bground4.jpg`,
    title: 'Random image4',
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
//   autoplay: true,
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
  return (
    <Slider className= {styles.slider} {...settings}>
      {imgPlaceholder.map((item) => (
        <div key={item.img}>
          <ImgCard img={item?.img} title={item?.title} />
        </div>
      ))}
    </Slider>
  );
};
