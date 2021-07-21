
import React, { useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faAngleDoubleRight, faAngleDoubleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { API, token } from '../../../../config/helpers'
import axios from 'axios'
import Context from '../../Brain/context'
import swal from 'sweetalert';

export const TransactionsTable = () => {
  const { vaccines, setVaccines, setModalVaccine, search} = useContext(Context)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPages] = useState(1)

  const getAdopter = async () => {
    try {
      const res = await axios.get(`${API}/veterinary_appointments`, {
        headers: {
          'Authorization': `${token}`
        },
        params: {
          q: search,
          page: page

        }
      })

      setVaccines([...res.data])
      setTotalPages(Math.ceil(res.headers.total / 25))
      if (Math.ceil(res.headers.total / 25) < 6) {
        setMaxPage(Math.ceil(res.headers.total / 25))
      }
    } catch {

    }
  }
  useEffect(() => {
    getAdopter()
  }, [search, page])


  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(5);


  const withIcons = true

  const onPrevItem = () => {
    const prevActiveItem = page === 1 ? page : page - 1;
    setPages(prevActiveItem);
    setDisableNext(false)
    if (prevActiveItem === 1) {
      setDisablePrev(true)
    }
      if (prevActiveItem < minPage) {
        setMinPage(prevActiveItem)
        setMaxPage(maxPage - 1)
      }
  };

  const onNextItem = (totalPages) => {
    const nextActiveItem = page === totalPages ? page : page + 1;
    setPages(nextActiveItem);
    setDisablePrev(false)
    if (nextActiveItem === totalPages) {
      setDisableNext(true)
    }
      if (nextActiveItem > maxPage) {
        setMaxPage(nextActiveItem)
        setMinPage(minPage + 1)
      }
  };


  const items = [];

  for (let number = minPage; number <= maxPage; number++) {
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
    const { id, image, control_type, date, pet, index } = props;
    const {setModalImage } = useContext(Context)



    const deleteVeterinary = async () => {
      try {
        await axios.delete(`${API}/veterinary_appointments/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        })

        const data = [...vaccines]
        data.splice(index, 1)
        setVaccines(data)
        swal("Estupendo!", "Operación exitosa", "success");
      } catch (error) {
        swal("Opps!", "Ocurrió un error", "error");
      }
    }


    return (
      <tr>
        <td>
          <p
            style={{
              color: '#4A5073',
              textDecoration: 'underline',
              fontWeight: 'bold',
              cursor: 'pointer',
              margin: '0',
              width: '148px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            onClick={() => setModalImage({ open: true, image: image?.url })}
          >
            {image?.name || ''}
          </p>
        </td>
        <td>
          <span className="fw-normal">
            {control_type}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {date}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {pet.name}
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
              <Dropdown.Item onClick={() => setModalVaccine({ open: true, id: id, type: 'edit', index: index })}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={deleteVeterinary}>
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
              <th className="border-bottom">Imagen de control</th>
              <th className="border-bottom">Tipo de control</th>
              <th className="border-bottom">Fecha de control</th>
              <th className="border-bottom">Nombre del perro</th>
              <th className="border-bottom">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((t, index) => <TableRow key={index} {...t} index={index} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination size={"md"} className="mt-3">
              <Pagination.Prev disabled={disablePrev} onClick={onPrevItem}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : "Previous"}
              </Pagination.Prev>
              {items}
              <Pagination.Next disabled={disableNext}  onClick={() => onNextItem(totalPages)}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : "Next"}
              </Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
