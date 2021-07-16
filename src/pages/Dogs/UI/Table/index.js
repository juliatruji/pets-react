
import React, { useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../Brain/context'
import { Routes } from "../../../../routes";

const data = [
  {
    "name": 'Lion',
    "raza": "Shitzu",
    "sexo": "Macho",
    "color": "Blanco",
    "esterilizado": 'si/no',
    "Tamano": 'pequeño',
    "foto": 'img.jpg',
    "status": 'img.jpg',

  },
]

export const TransactionsTable = () => {

  const { setModalAdoptDog, setModalCreateDog } = useContext(Context)

  
  const TableRow = (props) => {
    const { name, raza, sexo, color, esterilizado, Tamano, status } = props;
    
    const onOpenApoptDog = () => {
      setModalAdoptDog(true)
    }
    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {color}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {raza}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {sexo}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {esterilizado}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {Tamano}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onOpenApoptDog}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />  Adoptar
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setModalCreateDog({ open: true })}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Nombre Completo</th>
              <th className="border-bottom">DNI</th>
              <th className="border-bottom">Dirección</th>
              <th className="border-bottom">Celular</th>
              <th className="border-bottom">Edad</th>
              <th className="border-bottom">Estado de adopción</th>
              <th className="border-bottom">Foto</th>
              <th className="border-bottom">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Anterior
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Siguiente
              </Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
