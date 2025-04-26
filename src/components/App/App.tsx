import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';
import ImageModal from '../ImageModal/ImageModal';
import { useEffect, useState } from 'react';
import { fetchImgs } from '../../unsplash-api';
import { Image } from '../../types';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [imgList, setImgList] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [description, setDescription] = useState('');

  const openModal = (imgUrl: string, desc: string) => {
    setSelectedImage(imgUrl);
    setModalIsOpen(true);
    setDescription(desc);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = (userSearch: string) => {
    setSearchQuery(userSearch);
    setPage(1);
    setImgList([]);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImgs(searchQuery, page);
        if (data.length === 0) {
          toast('Sorry, nothing found', {
            position: 'top-right',
            icon: '🤷',
          });
          return;
        }
        setImgList(prevList => {
          return [...prevList, ...data];
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page, searchQuery]);

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {imgList.length > 0 && (
        <>
          <ImageGallery items={imgList} onView={openModal} />
          <ImageModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            imageUrl={selectedImage}
            imgDesc={description}
          />
        </>
      )}
      {loading && <Loader />}
      {imgList.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} />
      )}
    </>
  );
}
