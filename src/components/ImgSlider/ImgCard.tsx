import styles from './ImgCard.module.css';

type Props = {
  id: string;
  img: string;
  title: string;
  onImgClick: (id: string, url: string) => void;
};

export const ImgCard: React.FC<Props> = ({ id, img, title, onImgClick }) => {
  return (
    <div onClick={() => onImgClick(id, img)} className={styles['img-card']}>
      <img src={img} alt={title} />
    </div>
  );
};
