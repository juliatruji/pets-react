
import React, { useContext, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import Context from '../../Brain/context'
import { API, token } from '../../../../config/helpers'
import axios from 'axios'

export const TransactionsTable = () => {

  const { setModalAdoptDog, setModalCreateDog, dogs, setDogs } = useContext(Context)


  const getAdopter = async () => {
    try {
      const res = await axios.get(`${API}/pets`,  {
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
    getAdopter()
  }, [])

  const TableRow = (props) => {
    
    const { setModalImage, setDogs, dogs } = useContext(Context)
    const { id, name, race, gender, color, sterilized, size, image, adoption_status, index } = props;
    
    const onOpenApoptDog = () => {
      setModalAdoptDog({open:true, index: index, dog: {id:id,name:name}})
    }

    const deleteImage = async () => {
      try {
        await axios.delete(`${API}/pets/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        })
        
        const data = [...dogs]
        data.splice(index, 1)
        setDogs(data)
      } catch (error) {
        
      }
    }
    return (
      <tr>
        <td>
          {name}
        </td>
        <td>
          <span className="fw-normal">
            {race}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {gender}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {color}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {sterilized ? 'Si' : 'No'}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {size}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            <p 
              style={{ 
                color: '#4A5073',
                textDecoration:'underline',
                fontWeight:'bold',
                cursor:'pointer',
                margin:'0',
                width: '148px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={() => setModalImage({ open: true, image: image?.url})}
            >
              {image?.name || ''}
            </p>
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {adoption_status ? 'Si': 'No'}
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
              {
                !adoption_status && (
                  <Dropdown.Item onClick={onOpenApoptDog}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />  Adoptar
                  </Dropdown.Item>
                )
              }
              <Dropdown.Item onClick={() => setModalCreateDog({ open: true, id: id, type: 'edit', index: index })}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Editar
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={deleteImage}>
                <FontAwesomeIcon  icon={faTrashAlt} className="me-2" /> Eliminar
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
              <th className="border-bottom">Nombre</th>
              <th className="border-bottom">Raza</th>
              <th className="border-bottom">Sexo</th>
              <th className="border-bottom">Color</th>
              <th className="border-bottom">Esterilizado</th>
              <th className="border-bottom">Tamaño</th>
              <th className="border-bottom">Foto</th>
              <th className="border-bottom">Estado de adopcion</th>
              <th className="border-bottom">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((t, index) => <TableRow key={index} {...t} index={index} />)}
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
