
import React, { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faEdit, faEllipsisH,  faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../../../routes";
import { API, token } from '../../../../config/helpers'
import axios from 'axios'



export const TransactionsTable = () => {

  const [adoptions, setAdptions] = useState([])

  const getAdoptions = async () => {
    try {
      const res = await axios.get(`${API}/adoptions`, {
        headers: {
          'Authorization': `${token}`
        }
      })

      console.log(res.data);
      setAdptions(res.data)

    } catch {

    }
  }
  useEffect(() => {
    getAdoptions()
  }, [])

  const TableRow = (props) => {
    const { adopter, pet, date, admin } = props;

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {adopter.name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {pet.name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {date}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {admin.name}
          </span>
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
              <th className="border-bottom">Nombre del adoptante</th>
              <th className="border-bottom">Nombre del perro</th>
              <th className="border-bottom">Fecha de adopción</th>
              <th className="border-bottom">Nombre del administrador</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
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
