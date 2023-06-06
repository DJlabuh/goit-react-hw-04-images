import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GalleryItem key={image.id} onClick={openModal}>
        <Image src={image.webformatURL} alt={image.tags}></Image>
      </GalleryItem>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
