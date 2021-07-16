import React, { useContext, useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'

const Create = () => {

  const { modalAdoptDog, setModalAdoptDog } = useContext(Context)


  const handleClose = () => {
    setModalAdoptDog(false)
  }

  const handleSave = (e) => {
    e.preventDefault();
  }

  const onChangeName = (e) => {
    console.log(e.target.value);
  }
  return (
    <Modal as={Modal.Dialog} centered show={modalAdoptDog} onHide={handleClose}>
      <Form >
        <Modal.Header>
          <Modal.Title className="h6">Crear perro</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder=""  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adoptante</Form.Label>
            <Form.Select>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleSave} >
            Guardar
          </Button>
          <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Create;