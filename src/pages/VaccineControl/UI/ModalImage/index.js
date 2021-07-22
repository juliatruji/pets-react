import React, { useContext } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import { API } from '../../../../config/helpers';

const Create = () => {

  const { modalImage, setModalImage } = useContext(Context)

  const handleClose = () => {
    setModalImage({ open: false })
  }

  return (
    <Modal as={Modal.Dialog} centered show={modalImage.open} onHide={handleClose} >
        <Modal.Header>
          <Modal.Title className="h6">Imagen</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
        <img src={API + modalImage.image} class="img-fluid" alt="Vacuna" />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
    </Modal>
  );
};

export default Create;