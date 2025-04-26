import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../types';

interface ImageGalleryProps {
  items: Image[];
  onView: (url: string, description: string) => void;
}

export default function ImageGallery({ items, onView }: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map(item => {
        return (
          <li
            className={css.item}
            key={item.id}
            onClick={() => onView(item.urls.regular, item.description)}
          >
            <ImageCard card={item} />
          </li>
        );
      })}
    </ul>
  );
}
