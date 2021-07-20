import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import {API, token} from '../../../../config/helpers'
import Context from '../../Brain/context'
import axios from 'axios'

const Create = () => {

  const { modalAdopt, setModalAdopt, adopts, setAdopts } = useContext(Context)
  const [form, setForm] = useState({
    name: '',
    dni:'',
    address: '',
    cel: '',
    age: '',
  })


  const handleClose = () => {
    setModalAdopt({ open: false })
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (modalAdopt.type === 'create') {
        try {
          const res = await axios.post(`${API}/adopters`, {
            ...form,
          }, {
            headers: {
              'Authorization': `${token}`
            }
          })
          setAdopts([res.data.data.adopter, ...adopts])
          setModalAdopt({ open: false })
        } catch  {
          
        }
    } else if (modalAdopt.type === 'edit') {
      try {
        const res = await axios.patch(`${API}/adopters/${modalAdopt.id}`, {
          ...form,
        }, {
          headers: {
            'Authorization': `${token}`
          }
        })

        const data = [...adopts]
        data[modalAdopt.index] = res.data.data.adopter
        setAdopts([...data])
        setModalAdopt({ open: false })
      } catch {

      }
    }
  }

  const getAdopter = async () => {
    try {
      const res = await axios.get(`${API}/adopters/${modalAdopt.id}`, {
        headers: {
          'Authorization': `${token}`
        }
      })

      console.log(res.data);
      setForm({
        ...res.data
      })
    } catch {

    }
  }
  useEffect(() => {
    if (modalAdopt.type === 'edit') {
      getAdopter()
    }
  }, [modalAdopt])

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
            <Form.Control type="text" placeholder="Escriba un nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DNI</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dni" value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dirección" value={form.address } onChange={(e) => setForm({ ...form, address: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Celular</Form.Label>
            <Form.Control type="text" placeholder="Escriba una dirección" value={form.cel }onChange={(e) => setForm({ ...form, cel: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="text" placeholder="Escriba una edad" value={form.age } onChange={(e) => setForm({ ...form, age: e.target.value })}/>
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