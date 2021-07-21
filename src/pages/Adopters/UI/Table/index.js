
import React, { useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faAngleDoubleRight, faAngleDoubleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import { API, token } from '../../../../config/helpers'
import axios from 'axios'
import swal from 'sweetalert';


export const TransactionsTable = () => {

  const { adopts, setAdopts,search } = useContext(Context)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPages] = useState(1)

  const getAdopter =  async () => {
    try {
      const res = await axios.get(`${API}/adopters`, {
        headers: {
          'Authorization': `${token}`
        },
        params: {
          q: search,
          page: page
        }
      })
      
      console.log(res.data);
      setAdopts([...res.data])
      setTotalPages(Math.ceil(res.headers.total / 25))

    } catch {

    }
  }
  useEffect(() => {
    getAdopter()
  }, [search, page])

  const [disablePrev, setDisablePrev] = React.useState(true);
  const withIcons = true

  const onPrevItem = () => {
    const prevActiveItem = page === 1 ? page : page - 1;
    setPages(prevActiveItem);
    if (prevActiveItem === 1) {
      setDisablePrev(true)
    }
  };

  const onNextItem = (totalPages) => {
    const nextActiveItem = page === totalPages ? page : page + 1;
    setPages(nextActiveItem);
    setDisablePrev(false)
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    const isItemActive = page === number;

    const handlePaginationChange = () => {
      setPages(number);
    };

    items.push(
      <Pagination.Item active={isItemActive} key={number} onClick={handlePaginationChange}>
        {number}
      </Pagination.Item>
    );
  };


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
            <Pagination size={"md"} className="mt-3">
              <Pagination.Prev disabled={disablePrev} onClick={onPrevItem}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : "Previous"}
              </Pagination.Prev>
              {items}
              <Pagination.Next onClick={() => onNextItem(totalPages)}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : "Next"}
              </Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
