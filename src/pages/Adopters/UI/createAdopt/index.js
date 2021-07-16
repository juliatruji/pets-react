import React, { useContext, useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'

const Create = () => {

  const { modalAdopt, setModalAdopt } = useContext(Context)
  const [name, setName] = useState('')


  const handleClose = () => {
    setModalAdopt({ open: false })
  }

  const handleSave = (e) => {
    e.preventDefault();
  }

  const onChangeName = (e) => {
    console.log(e.target.value);
  }
  return (
    <Modal as={Modal.Dialog} centered show={modalAdopt.open} onHide={handleClose}>
      <Form >
        <Modal.Header>
          <Modal.Title className="h6">Crear perro</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Escriba un nombre" onChange={onChangeName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dni" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dirección" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="text" placeholder="Escriba una edad" />
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