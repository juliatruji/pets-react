
import React, { useContext, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faEdit, faEllipsisH,  faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import { API, token } from '../../../../config/helpers'
import axios from 'axios'
import swal from 'sweetalert';


export const TransactionsTable = () => {

  const { adopts, setAdopts,search } = useContext(Context)

  const getAdopter =  async () => {
    try {
      const res = await axios.get(`${API}/adopters`, {
        headers: {
          'Authorization': `${token}`
        },
        params: {
          q: search
        }
      })
      
      console.log(res.data);
      setAdopts([...res.data])

    } catch {

    }
  }
  useEffect(() => {
    getAdopter()
  }, [search])


  const TableRow = (props) => {
    const { id, name, dni, address, cel, age, index, count_pets } = props;
    const { setModalAdopt } = useContext(Context)


    const deleteAdopter = async () => {
      try {
        await axios.delete(`${API}/adopters/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        })

        const data = [...adopts]
        data.splice(index, 1)
        setAdopts(data)
        swal("Estupendo!", "Operación exitosa", "success");
      } catch (error) {
        swal("Opps!", "Ocurrió un error", "error");
      }
    }

    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          <span className="fw-normal">
            {dni}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {address}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {cel}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {age}
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
              <Dropdown.Item onClick={() => setModalAdopt({ open: true, id: id, type: 'edit', index: index })}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              {
                !count_pets && (
                  <Dropdown.Item className="text-danger" onClick={deleteAdopter}>
                    <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Eliminar
                  </Dropdown.Item>
                )
              }
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
            {adopts.map((t, index) => <TableRow key={index} {...t} index={index} />)}
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
