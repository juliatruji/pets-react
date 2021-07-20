import React, { useContext, useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import axios from 'axios'

const Create = () => {

  const { modalAdopt, setModalAdopt } = useContext(Context)
  const [form, setForm] = useState({
    name: '',
    dni:'',
    direction: '',
    cel: '',
    age: '',
  })




  const handleClose = () => {
    setModalAdopt({ open: false })
  }

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/adopters', {
        ...form,
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res);
    } catch  {
      
    }
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
            <Form.Control type="text" placeholder="Escriba un nombre" onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dni" onChange={(e) => setForm({ ...form, dni: e.target.value })}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dirección" onChange={(e) => setForm({ ...form, direction: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dirección" onChange={(e) => setForm({ ...form, cel: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="text" placeholder="Escriba una edad" onChange={(e) => setForm({ ...form, age: e.target.value })}/>
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