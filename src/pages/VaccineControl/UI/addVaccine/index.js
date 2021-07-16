import React, { useContext, useState } from 'react';
import { Button, Modal } from '@themesberg/react-bootstrap';
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const AddVaccine = () => {

  const { modalVaccine, setModalVaccine } = useContext(Context)
  const [name, setName] = useState('')
  const [birthday, setBirthday] = React.useState("");


  const handleClose = () => {
    setModalVaccine(false)
  }

  const handleSave = (e) => {
    e.preventDefault();
  }

  const onChangeName = (e) => {
    console.log(e.target.value);
  }
  return (
    <Modal as={Modal.Dialog} centered show={modalVaccine} onHide={handleClose}>
      <Form >
        <Modal.Header>
          <Modal.Title className="h6">Crear perro</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de control </Form.Label>
            <Form.Control type="text" placeholder="Escriba una dni" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de control </Form.Label>
            <Datetime
              timeFormat={false}
              closeOnSelect={false}
              onChange={setBirthday}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                    onChange={() => { }} />
                </InputGroup>
              )} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del perro</Form.Label>
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

export default AddVaccine;