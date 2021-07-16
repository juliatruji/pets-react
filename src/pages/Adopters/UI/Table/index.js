
import React, { useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faEdit, faEllipsisH,  faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../Brain/context'
import { Routes } from "../../../../routes";

const data = [
  {
    "name": 'Julia',
    "dni": "1235123",
    "direction": "Platinum Subscription Plan",
    "phone": "123243652346",
    "edad": '105',
  },
]


export const TransactionsTable = () => {

  

  const TableRow = (props) => {
    const { name, dni, direction, phone, edad } = props;

    const { setModalAdopt } = useContext(Context)

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {dni}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {direction}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {phone}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            ${parseFloat(edad).toFixed(2)}
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
              <Dropdown.Item onClick={() => setModalAdopt({ open:true })}>
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
