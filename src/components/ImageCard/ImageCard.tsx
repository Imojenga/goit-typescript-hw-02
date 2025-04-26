import css from './ImageCard.module.css';
import { Image } from '../../types';

interface ImageCardProps {
  card: Image;
}

export default function ImageCard({ card }: ImageCardProps) {
  return (
    <div className={css.wrp}>
      <img
        className={css.img}
        src={card.urls.small}
        alt={card.alt_description}
      />
    </div>
  );
}
