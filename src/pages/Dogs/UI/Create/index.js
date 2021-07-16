import React, { useContext, useState} from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'

const Create = () => {

  const { modalCreateDog, setModalCreateDog } = useContext(Context)
  const [ name, setName ] = useState('')


  const handleClose = () => {
    setModalCreateDog({open:false})
  }

  const handleSave = (e) => {
    e.preventDefault();
  }

  const onChangeName = (e) => {
    console.log(e.target.value);
  }
  return (
    <Modal as={Modal.Dialog} centered show={modalCreateDog.open} onHide={handleClose}>
      <Form >
      <Modal.Header>
        <Modal.Title className="h6">Crear perro</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Escriba un nombre"  onChange={onChangeName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Raza</Form.Label>
            <Form.Control type="text" placeholder="Escriba una raza" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <fieldset>
              <Form.Check
                defaultChecked
                type="radio"
                defaultValue="Macho"
                label="Macho"
                name="macho"
                id="macho"
                htmlFor="radio1"
              />
              <Form.Check
                type="radio"
                defaultValue="Hembra"
                label="Hembra"
                name="hembra"
                id="hembra"
                htmlFor="radio2"
              />
            </fieldset>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" placeholder="Escriba un color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Esterelizado</Form.Label>
            <fieldset>
              <Form.Check
                defaultChecked
                type="radio"
                defaultValue="si"
                label="Si"
                name="si"
                id="si"
                htmlFor="radio1"
              />
              <Form.Check
                type="radio"
                defaultValue="no"
                label="No"
                name="no"
                id="no"
                htmlFor="radio2"
              />
            </fieldset>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tamaño</Form.Label>
            <Form.Control type="text" placeholder="Escriba un tamaño" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foto del perro</Form.Label>
            <Form.Control type="file" />
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