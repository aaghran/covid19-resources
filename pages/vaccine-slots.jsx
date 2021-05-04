import Head from "next/head";
import { Fragment } from "react";
import {
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Col,
  ListGroup,
  Alert,
  Badge,
} from "react-bootstrap";

import NavBar from "../components/nav";
import VaccineCenters from "../components/vaccineCenters";
import Image from "next/image";
import { getStates, getDistricts, getCalendarByDistrict } from "../api/cowin";

import { Typeahead } from "react-bootstrap-typeahead";
import BootstrapTable from "react-bootstrap-table-next";

import moment from "moment";

class VaccineSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDistricts: [],
      district: [],
      allStates: [],
      stateId: [],
      centers: [],
      allCenters: [],
      available18: 0,
      available45: 0,
    };

    this.setDistrict = this.setDistrict.bind(this);
    this.setStates = this.setStates.bind(this);
    this.getSlots = this.getSlots.bind(this);
    this.filterCenters = this.filterCenters.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }
  componentDidMount() {
    getStates()
      .then((response) => response.json())
      .then((list) => {
        let allStates = [];
        list.states.map(function (state) {
          allStates.push(`${state.state_id}-${state.state_name}`);
        });
        this.setState({ allStates });
      });
  }

  setDistrict(district) {
    this.setState(
      {
        district,
      },
      this.getSlots
    );
  }
  setStates(stateId) {
    this.setState(
      {
        stateId,
        allDistricts: [],
      },
      this.getDistricts
    );
  }

  getDistricts() {
    if (this.state.stateId.length) {
      getDistricts(this.state.stateId[0])
        .then((response) => response.json())
        .then((list) => {
          let allDistricts = [];
          list.districts.map(function (district) {
            allDistricts.push(
              `${district.district_id}-${district.district_name}`
            );
          });
          console.log(allDistricts);
          this.setState({ allDistricts });
        });
    }
  }

  resetSearch() {
    // let { allCenters } = this.state;
  }

  filterCenters(value) {
    let { allCenters } = this.state;
    let data = [];
    allCenters.map(function (center) {
      let sessions = center.sessions.filter(
        (session) => session.min_age_limit == value
      );
      if (sessions.length) {
        center.sessions = sessions;
        data.push(center);
      }
    });
    this.setState({ centers: data });
  }

  getSlots() {
    if (this.state.district.length) {
      let district = this.state.district[0];
      district = district.split("-");
      let date = moment().format("DD-MM-YYYY");

      getCalendarByDistrict(district[0], date)
        .then((response) => response.json())
        .then((data) => {
          let centers = [];
          let available18 = 0;
          let available45 = 0;
          data.centers.map(function (center) {
            if (
              center.sessions.length > 0 &&
              center.sessions.filter(
                (session) => session.available_capacity > 0
              ).length
            ) {
              centers.push(center);
              let session18 = center.sessions.filter(
                (session) => session.min_age_limit == 18
              );
              if (session18.length) center.available18 = true;

              available18 = session18.reduce(function (acc, curr) {
                return acc + curr.available_capacity;
              }, available18);

              let session45 = center.sessions.filter(
                (session) => session.min_age_limit == 45
              );
              if (session45.length) center.available45 = true;

              available45 = session45.reduce(function (acc, curr) {
                return acc + curr.available_capacity;
              }, available45);
            }
          });
          console.log(`available18 ${available18}, available45 ${available45}`);
          this.setState({
            allCenters: centers,
            centers,
            available18,
            available45,
          });
        });
    }
  }
  render() {
    return (
      <Fragment>
        <Head>
          <title>CoWIN Vaccination Slot Availability</title>
          <meta name="title" content="CoWIN Vaccination Slot Availability" />
          <meta name="description" content="" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://covid19.aaghran.com/" />
          <meta
            property="og:title"
            content="CoWIN Vaccination Slot Availability"
          />
          <meta property="og:description" content="" />
          <meta
            property="og:image"
            content="https://wanderingbong-v2.s3.ap-south-1.amazonaws.com/bg-covid.webp"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://covid19.aaghran.com/" />
          <meta
            property="twitter:title"
            content="CoWIN Vaccination Slot Availability"
          />
          <meta property="twitter:description" content="" />
          <meta
            property="twitter:image"
            content="https://wanderingbong-v2.s3.ap-south-1.amazonaws.com/bg-covid.webp"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KFXF3TG');`,
            }}
          ></script>
        </Head>
        <NavBar />
        <Container>
          <Container fluid>
            <Row className="justify-content-md-between">
              <Col sm="12" className="mb-2">
                <h1 className="mt-2">CoWIN Vaccination Slot Availability</h1>
                {/* <p>Find slots for vaccination based on CoWin Availability</p> */}
              </Col>
              <Col sm="12" className="mt-4 border p-4 rounded">
                <Card.Title>Search Vaccination slots by District</Card.Title>
                <Card.Text className="p-0">
                  Choose State
                  <Form.Group>
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="state"
                      onChange={this.setStates}
                      options={this.state.allStates}
                    />
                  </Form.Group>
                  Choose District
                  <Form.Group>
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="district"
                      onChange={this.setDistrict}
                      options={this.state.allDistricts}
                    />
                  </Form.Group>
                </Card.Text>
              </Col>
              <Col sm="12" className="mt-4 border p-4 rounded">
                <Row>
                  <Col sm="12" lg="4" className="p-2">
                    <span className="mr-2">
                      {" "}
                      Available Centers{" "}
                      <Badge
                        variant={
                          this.state.centers.length ? "success" : "danger"
                        }
                        className="p-2"
                      >
                        {`${this.state.centers.length}`}
                      </Badge>
                    </span>
                  </Col>
                  <Col
                    sm="12"
                    lg="4"
                    className="p-2 justify-content-center d-flex"
                  >
                    {/* <span className="mr-2"> Check slots &rarr;</span> */}
                    <Button
                      variant={this.state.available18 ? "outline-success" : "outline-danger"}
                      onClick={() => this.filterCenters(18)}
                    >
                      18-45:{" "}
                      <Card.Subtitle className="p-2 font-weight-bolder">{`${this.state.available18}`}</Card.Subtitle>
                    </Button>
                    <Button
                      className="ml-2"
                      variant={this.state.available45 ? "outline-success" : "outline-danger"}
                      onClick={() => this.filterCenters(45)}
                    >
                      {">"} 45:{" "}
                      <Card.Subtitle className="p-2 font-weight-bolder">{`${this.state.available45}`}</Card.Subtitle>
                    </Button>
                  </Col>
                  <Col
                    sm="12"
                    lg="4"
                    className="p-2 justify-content-end d-flex"
                  >
                    <Button
                      variant="outline-primary"
                      className="ml-4"
                      onClick={this.getSlots}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12" className="mt-2">
                    {this.state.centers.length ? (
                      <>
                        <VaccineCenters centers={this.state.centers} />
                      </>
                    ) : (
                      <>
                        <Alert variant={"warning"}>
                          No centers found. Select city and district.
                        </Alert>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm="12">
                <p>
                  <a href="https://www.covid19india.org" target="blank">
                    Covid19 cases
                  </a>
                  <br />A volunteer-driven crowdsourced effort to track the
                  coronavirus in India.
                </p>
              </Col>
            </Row>
          </Container>
        </Container>

        <footer className="cntr-footer">
          © <a href="https://aaghran.com/">Aaghran Ghosh</a> - 2021
        </footer>
      </Fragment>
    );
  }
}

export default VaccineSlots;
