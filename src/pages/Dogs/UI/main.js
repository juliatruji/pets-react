import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Breadcrumb, InputGroup, Toast } from '@themesberg/react-bootstrap';
import Create from './Create'
import ApoptDog from './AdoptDog'
import ModalImage from './ModalImage'
import { faBootstrap } from '@fortawesome/free-brands-svg-icons';
import { TransactionsTable } from './Table/index.js';
import Context from '../Brain/context'

const Main = () => {

  const { setModalCreateDog } = useContext(Context)

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item active>Perros</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Perros</h4>
          {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
        </div>
        {/* <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div> */}
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Buscar" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Button variant="primary" className="m-1" onClick={() => setModalCreateDog({ open: true, type: 'create' })}>
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Agregar
            </Button>
          </Col>
        </Row>
      </div>
      <TransactionsTable />
      <ApoptDog />
      <Create />
      <ModalImage />
    </>
  );
};

export default Main;


