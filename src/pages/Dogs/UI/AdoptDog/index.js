import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, InputGroup } from '@themesberg/react-bootstrap';
import { Form } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import moment from 'moment'
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { API, token } from '../../../../config/helpers'
import swal from 'sweetalert';

const Create = () => {

  const { modalAdoptDog, setModalAdoptDog, setDogs, dogs } = useContext(Context)
  const [dateAdopt, setDateAdopt] = useState("");
  const [adopts, setAdopts] = useState([]);
  const [adoptSelect, setAdoptSelect] = useState([]);



  const handleClose = () => {
    setModalAdoptDog({open:false})
  }

  const handleSave = async (e) => {
    e.preventDefault();
   
    try {
      await axios.post(`${API}/adoptions`, {
        adoption:{
          date: dateAdopt,
          pet_id: modalAdoptDog.dog?.id,
          admin_id: parseInt(localStorage.getItem('idAdmin')),
          adopter_id: parseInt(adoptSelect),
        }
      }, {
        headers: {
          'Authorization': `${token}`
        }
      })
      
      const data = [...dogs]
      data[modalAdoptDog.index] = {
        ...data[modalAdoptDog.index],
        adoption_status:true
      }
      setDogs(data)

      setModalAdoptDog({open:false})
      swal("Estupendo!", "Operación exitosa", "success");
    } catch (error) {
      swal("Opps!", "Ocurrió un error", "error");

    }
  }

  const getAdopter = async () => {
    try {
      const res = await axios.get(`${API}/adopters`, {
        headers: {
          'Authorization': `${token}`
        }
      })

      console.log(res.data);
      setAdopts([...res.data])

    } catch {

    }
  }
  useEffect(() => {
    getAdopter()
  }, [])

  return (
    <Modal as={Modal.Dialog} centered show={modalAdoptDog.open} onHide={handleClose}>
      <Form >
        <Modal.Header>
          <Modal.Title className="h6">Crear perro</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Perro</Form.Label>
            <Form.Control disabled type="text" value={modalAdoptDog.dog?.name} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adoptante</Form.Label>
            <Form.Select onChange={(e) => setAdoptSelect(e.target.value)}>
              <option>Elija el adoptante</option>
              {
                adopts.map((adopt, index) => (
                  <option value={adopt.id} key={index}>{adopt.name}</option>
                ))
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Datetime
              timeFormat={false}
              closeOnSelect={false}
              onChange={setDateAdopt}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    value={dateAdopt ? moment(dateAdopt).format("MM/DD/YYYY") : ""}
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                    onChange={() => { }} />
                </InputGroup>
              )} />
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