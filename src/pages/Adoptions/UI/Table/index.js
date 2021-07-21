
import React, { useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import {  Nav, Card,  Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../../../routes";
import { API, token } from '../../../../config/helpers'
import axios from 'axios'
import Context from '../../Brain/context'


export const TransactionsTable = () => {

  const [adoptions, setAdptions] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPages] = useState(1)


  const { search } = useContext(Context)

  const getAdoptions = async () => {
    try {
      const res = await axios.get(`${API}/adoptions`, {
        headers: {
          'Authorization': `${token}`,
        },
        params:{
          q: search,
          page: page
        }
      })

      console.log(res);
      setAdptions(res.data)
      console.log(Math.ceil(res.headers.total / 25));
      setTotalPages(Math.ceil(res.headers.total / 25))
      if (Math.ceil(res.headers.total / 25) < 6) {
        setMaxPage(Math.ceil(res.headers.total / 25))
      }
    } catch {

    }
  }
  useEffect(() => {
    getAdoptions()
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
    const { adopter, pet, date, admin } = props;
    return (
      <tr>
        <td>
          {adopter.name}
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
            {adoptions.map((t, index) => <TableRow index={index} key={index} {...t} />)}
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
