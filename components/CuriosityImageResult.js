import React, { useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

export default ({ images }) => {
  const [selectedIndex, updateSelectedIndex] = useState(0);
  const [modalIsOpen, updateModalIsOpen] = useState(false);

  const toggleModal = selectedIndex => {
    updateModalIsOpen(!modalIsOpen);
    updateSelectedIndex(selectedIndex);
  };

  return (
    <div>
      {images.length !== 0 && <p style={{textAlign: 'center'}}>{images.length} Images</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {images.map(({ author, caption, img_src }, j) => (
          <span onClick={() => toggleModal(j)} key={img_src} style={{ width: "150px", height: "150px", cursor: "zoom-in" }}>
            <img
              alt={caption}
              src={img_src}
              style={{ width: "100%", height: "100%", border: "1px solid white" }}
            />
          </span>
        ))}
      </div>

      <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={toggleModal}>
            <Carousel
              currentIndex={selectedIndex}
              frameProps={{ autoSize: "height" }}
              views={images}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};
