import styles from './MainContainerCard.module.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const MainContainerCard: React.FC<Props> = ({ children }) => {
  return <div className={styles['card-container']}>{children}</div>;
};
