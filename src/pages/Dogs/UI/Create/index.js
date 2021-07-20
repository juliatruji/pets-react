import React, { useContext, useState, useEffect} from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import { API, token } from '../../../../config/helpers'
import axios from 'axios'

const Create = () => {

  const { modalCreateDog, setModalCreateDog, dogs, setDogs } = useContext(Context)
  const [form, setForm] = useState({
    name: '',
    race: '',
    gender: '',
    color: '',
    sterilized: '',
    size: '',
    image: '',
  })


  const handleClose =  () => {
    setModalCreateDog({open:false})
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData()
    formData.append('pet[name]', form.name);
    formData.append('pet[race]', form.race);
    formData.append('pet[gender]', form.gender);
    formData.append('pet[color]', form.color);
    formData.append('pet[sterilized]', form.sterilized);
    formData.append('pet[size]', form.size);
    formData.append('pet[image]', form.image);

    // console.log(formData.values());

    if (modalCreateDog.type === 'create') {
      try {
        const res = await axios({
          method: 'POST',
          url: `${API}/pets`,
          data: formData,
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
           }
        })
        console.log(res);
        setDogs([res.data.data.pet, ...dogs])
        setModalCreateDog({ open: false })
      } catch {

      }
    } else if (modalCreateDog.type === 'edit') {
      try {
        const res = await axios({
          method: 'PATCH',
          url: `${API}/pets/${modalCreateDog.id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
          }
        })
        console.log(res);
        const data = [...dogs]
        data[modalCreateDog.index] = res.data.data.pet
        setDogs([...data])
        setModalCreateDog({ open: false })
      } catch {

      }
    }
  }


  const onChangeImage= (e) => {
    setForm({ ...form, image: e.target.files[0] })
    console.log(e.target.file)

  }

  const getDogs = async () =>{
    try {
      const res = await axios.get(`${API}/pets/${modalCreateDog.id}`, {
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
    if (modalCreateDog.type === 'edit') {
      getDogs()
    }
  }, [modalCreateDog])
  return (
    <Modal as={Modal.Dialog} centered show={modalCreateDog.open} onHide={handleClose} >
      <Form encType="multipart/form-data">
      <Modal.Header>
        <Modal.Title className="h6">Crear</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Escriba un nombre" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Raza</Form.Label>
            <Form.Control type="text" placeholder="Escriba una raza" value={form.race}  onChange={(e) => setForm({ ...form, race: e.target.value })}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Select value={form.gender}   onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option defaultValue>Macho</option>
              <option>Hembra</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control value={form.color}   type="text" placeholder="Escriba un color" onChange={(e) => setForm({ ...form, color: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Esterelizado</Form.Label>
            <Form.Select value={form.sterilized}   onChange={(e) => setForm({ ...form, sterilized: e.target.value })}>
              <option defaultValue>No</option>
              <option>Si</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tamaño</Form.Label>
            <Form.Control value={form.size}   type="text" placeholder="Escriba un tamaño" onChange={(e) => setForm({ ...form, size: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foto</Form.Label>
            <Form.Control  type="file" name="imagen" accept="image/png, .jpeg, .jpg" onChange={(e) => onChangeImage(e)}/>
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