
import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faDog, faPaw, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { API, token }from '../../config/helpers'
import axios from 'axios'

export default () => {


  const [statistics, setStatistics] = useState({})

  const getStatistics = async () =>{
    try {
      const res = await axios.get(`${API}/statistics`, {
        headers: {
          'Authorization': `${token}`
        }
      })

      console.log(res.data);
      setStatistics(res.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Adopciones"
            value={statistics.adopters?.total}
            percentage={10.57}
            ages={statistics.adopters?.ages}
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Adoptados"
            title={statistics.pets?.adopted}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faDog}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Sin adoptar"
            title={statistics.pets?.not_adopted}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faDog}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Esterilizados"
            title={statistics.pets?.sterilized}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faDog}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Sin esterilizar"
            title={statistics.pets?.not_sterilized}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faDog}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={6} className="mb-4">
          <CircleChartWidget
            title="Tamaños"
            data={[
              { id: 1, label: "Gigantes", value: parseInt(statistics.pets?.sizes?.extra_large), color: "tertiary", icon: faPaw },
              { id: 2, label: "Grandes", value: parseInt(statistics.pets?.sizes?.large), color: "secondary", icon: faPaw },
              { id: 3, label: "Medianos", value: parseInt(statistics.pets?.sizes?.medium), color: "primary", icon: faPaw },
              {id: 4, label: "Pequeños", value: parseInt(statistics.pets?.sizes?.small), color: "warning", icon: faPaw }
            ]}
            />
        </Col>
      </Row>
{/* 
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </>
  );
};
