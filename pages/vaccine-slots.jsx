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
      available18: 0,
      available45: 0,
    };

    this.setDistrict = this.setDistrict.bind(this);
    this.setStates = this.setStates.bind(this);
  }
  componentDidMount() {
    getStates()
      .then((response) => response.json())
      .then((list) => {
        let allStates = [];
        list.states.map(function (state) {
          allStates.push(`${state.state_id}-${state.state_name}`);
        });
        console.log(allStates);
        this.setState({ allStates });
      });
    console.log(this.state);
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

  getSlots() {
    if (this.state.district.length) {
      let district = this.state.district[0];
      district = district.split("-");
      console.log(district);
      let date = moment().format("DD-MM-YYYY");

      getCalendarByDistrict(district[0], date)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.centers);
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
              console.log(session18);
              available18 = session18.reduce(function (acc, curr) {
                return acc + curr.available_capacity;
              }, available18);

              let session45 = center.sessions.filter(
                (session) => session.min_age_limit == 45
              );
              console.log(session45);
              available45 = session45.reduce(function (acc, curr) {
                return acc + curr.available_capacity;
              }, available45);
            }
          });
          console.log(`available18 ${available18}, available45 ${available45}`);
          this.setState({ centers, available18, available45 });
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
              <Col sm="12">
                <Card className="">
                  <Card.Body>
                    <Card.Title>
                      Search Vaccination slots by District
                    </Card.Title>
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
                      <Button variant="outline-primary" className="mb-4">
                        Reset
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="12">
                <Card className="mt-4 pt-0">
                  <Card.Body>
                    <Card.Text className="p-2">
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
                      <span className="mr-2"> Avaiable slots </span>
                      <Badge
                        variant={this.state.available18 ? "success" : "danger"}
                        className="p-2"
                      >
                        18-45 : {`${this.state.available18}`}
                      </Badge>
                      {/* {!this.state.available18 && (
                        <Button variant="outline-primary" className="mb-4">
                          Notify me!
                        </Button>
                      )} */}
                      <Badge variant={"success"} className="ml-4 p-2">
                        45+ : {`${this.state.available45}`}
                      </Badge>
                    </Card.Text>
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
                  </Card.Body>
                </Card>
              </Col>
              <Col>
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
