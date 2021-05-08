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

import VaccineCenters from "../components/vaccineCenters";
import { getStates, getDistricts, getCalendarByDistrict } from "../api/cowin";

import { Typeahead } from "react-bootstrap-typeahead";
import BootstrapTable from "react-bootstrap-table-next";

import moment from "moment";
import ShareIcons from "../components/share_icons";

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
      filterAge: 0,
      showSearch: true,
      formLink: "",
    };

    this.setDistrict = this.setDistrict.bind(this);
    this.setStates = this.setStates.bind(this);
    this.getSlots = this.getSlots.bind(this);
    this.filterCenters = this.filterCenters.bind(this);
    this.filterByPincode = this.filterByPincode.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
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

  toggleSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
    });
    console.log(this.state);
  }

  setDistrict(district) {
    let param = district[0];
    let formLink = "";
    if (param) {
      param = param.split("-");
      formLink = `https://docs.google.com/forms/d/e/1FAIpQLSdF2zjPVg3DJP3Q2niy17JD41wFtZqbUuirCJh7Wr33avh85A/viewform?usp=pp_url&entry.1667511934=District&entry.1484605708=${param[0]}`;
    }

    this.setState(
      {
        district,
        formLink,
      },

      this.getSlots
    );
  }
  setStates(stateId) {
    this.setState(
      {
        stateId,
        allDistricts: [],
        district: [],
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
  filterByPincode(pincode) {
    let { filterAge, allCenters } = this.state;
    this.setState({ centers: allCenters });
    this.filterCenters(filterAge);
    let { centers } = this.state;
    let data = centers;
    if (pincode)
      data = centers.filter((center) => {
        return center.pincode.toString().includes(pincode);
      });
    this.setState({ centers: data });
  }

  filterCenters(value) {
    let { allCenters } = this.state;
    if (value == 0) {
      this.setState({ centers: allCenters, filterAge: value });
    }
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
    this.setState({ centers: data, filterAge: value });
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
            showSearch: !this.state.showSearch,
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
          <meta
            name="description"
            content="While the process of registering for COVID vaccine is simple, getting a slot is extremely difficult in India. Search available slots for a district or by pincode"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://covid19.aaghran.com/" />
          <meta
            property="og:title"
            content="CoWIN Vaccination Slot Availability"
          />
          <meta
            property="og:description"
            content="While the process of registering for COVID vaccine is simple, getting a slot is extremely difficult in India. Search available slots quickly for a district or by pincode"
          />
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
          <meta
            property="twitter:description"
            content="While the process of registering for COVID vaccine is simple, getting a slot is extremely difficult in India. Search available slots quickly for a district or by pincode"
          />
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
          <script
            data-ad-client="ca-pub-9678197142380634"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <script
            src="https://kit.fontawesome.com/dddd44537f.js"
            crossorigin="anonymous"
          ></script>
        </Head>
        {/* <NavBar /> */}
        <Container>
          <Container fluid>
            <Row className="justify-content-md-between">
              <Col sm="12" className="">
                <h1 className="">CoWIN Vaccination Slot Availability</h1>
                <Alert variant="secondary" className="text-center">
                  Soon to be added <br />
                  Get notified when stocks are available
                </Alert>
              </Col>
              <Col sm="12" className="border p-4 rounded bg-white">
                <>
                  <Card.Title>Search Vaccination slots by District</Card.Title>
                  <Card.Body className="p-0">
                    Choose State
                    <Form.Group>
                      <Typeahead
                        id="basic-typeahead-multiple-state"
                        clearButton
                        labelKey="state"
                        onChange={this.setStates}
                        onClick={() => {
                          console.log("click");
                        }}
                        options={this.state.allStates}
                      />
                      Choose District
                      <Typeahead
                        id="basic-typeahead-multiple-district"
                        labelKey="district"
                        clearButton
                        onChange={this.setDistrict}
                        value={this.state.district}
                        options={this.state.allDistricts}
                      />
                    </Form.Group>
                  </Card.Body>
                </>
              </Col>
              <ShareIcons
                className="m-2"
                title="Search available slots for a district or by pincode #vaccination #tracker #CovidVaccineIndia"
                shareUrl={"https://covid19.aaghran.com/vaccine-slots"}
              />

              <Col sm="12" className="border p-4 rounded bg-white">
                <Row>
                  <Col sm="12">
                    {!this.state.available18 && this.state.district.length ? (
                      <Button
                        block
                        variant="danger"
                        href={`${this.state.formLink}&entry.29570978=18`}
                        target="blank"
                        className="mb-2"
                      >
                        Notify Me for 18+
                      </Button>
                    ) : (
                      ""
                    )}
                    {!this.state.available45 && this.state.district.length ? (
                      <Button
                        block
                        variant="outline-warning"
                        href={`${this.state.formLink}&entry.29570978=45`}
                        target="blank"
                        className="mt-2"
                      >
                        Notify Me for 45+
                      </Button>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col
                    sm="12"
                    lg="4"
                    className="p-2 justify-content-left d-flex"
                  >
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
                    sm="8"
                    lg="4"
                    className="p-2 justify-content-left d-flex"
                  >
                    <span className="mr-2"> Filter &rarr;</span>
                    <Button
                      variant={
                        this.state.available18
                          ? "outline-success"
                          : "outline-danger"
                      }
                      onClick={() => this.filterCenters(18)}
                    >
                      18-45:{" "}
                      <span className="p-2 font-weight-bolder">{`${this.state.available18}`}</span>
                    </Button>
                    <Button
                      className="ml-2"
                      variant={
                        this.state.available45
                          ? "outline-success"
                          : "outline-danger"
                      }
                      onClick={() => this.filterCenters(45)}
                    >
                      {">"} 45:{" "}
                      <span className="p-2 font-weight-bolder">{`${this.state.available45}`}</span>
                    </Button>
                  </Col>
                  <Col sm="4" lg="4" className="p-2 justify-content-end d-flex">
                    <InputGroup className="">
                      {/* <InputGroup.Prepend>
                        <InputGroup.Text>H</InputGroup.Text>
                      </InputGroup.Prepend> */}
                      <FormControl
                        id="inputPincode"
                        type="number"
                        placeholder="Pincode"
                        onChange={(e) => this.filterByPincode(e.target.value)}
                      />
                      <InputGroup.Append></InputGroup.Append>
                    </InputGroup>
                    <Button
                      variant="outline-primary"
                      className="ml-2"
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
                        {this.state.district.length ? (
                          <Button
                            block
                            variant="success"
                            href={this.state.formLink}
                            target="blank"
                            className="mb-2"
                          >
                            Notify Me when vaccines are available!
                          </Button>
                        ) : (
                          ""
                        )}
                        <Alert variant={"warning"}>
                          No centers found. Select city and district.
                          <br />
                        </Alert>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col sm="12">
                <hr />
                <p>
                  Quick Twitter search links for Covid19 related leads
                  <Button
                    variant="outline-primary"
                    href="/twitter-search"
                    size="sm"
                    className="ml-2"
                  >
                    Search Twitter &rarr;
                  </Button>
                </p>
                <hr />
                <p>
                  <a href="https://www.covid19india.org" target="blank">
                    Covid19 count tracker
                  </a>
                  <br />A volunteer-driven crowdsourced effort to track the
                  coronavirus in India.
                </p>
                <hr />
                <p>
                  This web app uses CoWin open API to make it easy for you to
                  find slots. Availability changes in real time. <br />
                  So book your slot ASAP using{" "}
                  <a
                    href="https://selfregistration.cowin.gov.in"
                    target="blank"
                  >
                    https://selfregistration.cowin.gov.in.
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </Container>

        <footer className="cntr-footer">
          <b>
            Note - Ad revenue will be contributed to NGOs operating for covid19
            relief.
          </b>
          <br />© <a href="https://aaghran.com/">Aaghran Ghosh</a> - 2021
        </footer>
      </Fragment>
    );
  }
}

export default VaccineSlots;
