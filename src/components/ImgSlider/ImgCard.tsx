import styles from './ImgCard.module.css';

type Props = {
  img: string;
  title: string;
};

export const ImgCard: React.FC<Props> = ({ img, title }) => {
  return (
    <div className={styles['img-card']}>
      <img src={img} alt={title} />
    </div>
  );
};
