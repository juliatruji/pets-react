import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import { API, token } from '../../../../config/helpers'
import axios from 'axios'
const AddVaccine = () => {

  const { modalVaccine, setModalVaccine, setVaccines, vaccines } = useContext(Context)
  const [dateControl, setDateControl] = useState('');
  const [dogs, setDogs ] = useState([])
  const [form, setForm] = useState({
    image: '',
    control_type: '',
    pet_id: '',
  })


  const getPets = async () => {
    try {
      const res = await axios.get(`${API}/pets`, {
        headers: {
          'Authorization': `${token}`
        },
        params: {
          q: ''
        }
      })
      setDogs([...res.data])
    } catch {
    }
  }

  useEffect(() => {
    getPets()
  }, [])

  const handleClose = () => {
    setModalVaccine({open:false})
    setForm({
      image: '',
      control_type: '',
      pet_id: '',
    })
  }

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData()
    formData.append('veterinary_appointment[image]', form.image);
    formData.append('veterinary_appointment[control_type]', form.control_type);
    formData.append('veterinary_appointment[date]', dateControl);
    formData.append('veterinary_appointment[pet_id]', form.pet_id);

    if (modalVaccine.type === 'create') {
      try {
        const res = await axios({
          method: 'POST',
          url: `${API}/veterinary_appointments`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
          }
        })
        console.log(res);
        setVaccines([res.data.data.veterinary_appointment, ...vaccines])
        swal("Estupendo!", "Operación exitosa", "success");
      } catch {
        swal("Opps!", "Ocurrió un error", "error");
      }
    } else if (modalVaccine.type === 'edit') {
      try {
        const res = await axios({
          method: 'PATCH',
          url: `${API}/veterinary_appointments/${modalVaccine.id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
          }
        })
        console.log(res);
        const data = [...vaccines]
        data[modalVaccine.index] = res.data.data.veterinary_appointment
        setVaccines([...data])
        swal("Estupendo!", "Operación exitosa", "success");
      } catch {
        swal("Opps!", "Ocurrió un error", "error");
      }
    }
    handleClose()
  }

  const onChangeImage = (e) => {
    setForm({ ...form, image: e.target.files[0] })
    console.log(e.target.file)

  }

  const getVaccines = async () => {
    try {
      const res = await axios.get(`${API}/veterinary_appointments/${modalVaccine.id}`, {
        headers: {
          'Authorization': `${token}`
        }
      })

      setForm({
        control_type: res.data.control_type,
        pet_id: res.data.pet.id,
      })
      setDateControl(res.data.date)
    } catch {

    }
  }

  useEffect(() => {
    if (modalVaccine.type === 'edit') {
      getVaccines()
    }
  }, [modalVaccine])


  return (
    <Modal as={Modal.Dialog} centered show={modalVaccine.open} onHide={handleClose}>
      <Form >
        <Modal.Header>
          <Modal.Title className="h6">Crear control de vacunas</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" name="imagen" accept="image/png, .jpeg, .jpg" onChange={(e) => onChangeImage(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de control </Form.Label>
            <Form.Control type="text" placeholder="Escriba una dni" value={form.control_type} onChange={(e) => setForm({ ...form, control_type: e.target.value })}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de control </Form.Label>
            <Datetime
              timeFormat={false}
              closeOnSelect={false}
              onChange={setDateControl}
              renderInput={(date, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    value={dateControl ? moment(dateControl).format("MM/DD/YYYY") : ""}
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                    onChange={() => { }} />
                </InputGroup>
              )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del perro</Form.Label>
            <Form.Select value={form.pet_id} onChange={(e) => setForm({ ...form, pet_id: e.target.value })}>
              <option>Seleccion perro</option>
              {
                dogs.map((dog) => (
                  <option value={dog.id}>{dog.name}</option>
                ))
              }
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

export default AddVaccine;