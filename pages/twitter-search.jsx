import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  ListGroup,
  Col,
  Alert,
} from "react-bootstrap";

const topCities = [
  "Delhi",
  "Pune",
  "Mumbai",
  "Bangalore",
  "Thane",
  "Hyderabad",
  "Nagpur",
  "Lucknow",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Goa",
  "Jaipur",
];

import NavBar from "../components/nav";
import { Typeahead } from "react-bootstrap-typeahead";
import Cities from "../data/cities.json";

export default class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesList: Cities.sort(),
      requirementsQuery: [
        "Beds",
        "ICU",
        "Oxygen",
        "Ventilator",
        "Tests",
        "Fabiflu",
        "Remdesivir",
        "Plasma",
        "Food",
      ],
      reqQuery: "",
      reqOptions: [
        "Beds",
        "ICU",
        "Oxygen",
        "Ventilator",
        "Tests",
        "Fabiflu",
        "Remdesivir",
        "Plasma",
        "Food",
      ],
      twitterlink: "",
      verified: true,
      minFavs: 5,
      citiesQuery: ["Bangalore"],
    };

    this.setCitiesQuery = this.setCitiesQuery.bind(this);
    this.setRequirementsQuery = this.setRequirementsQuery.bind(this);
    this.setTwitterlink = this.setTwitterlink.bind(this);
    this.setVerified = this.setVerified.bind(this);
  }

  componentDidMount() {
    this.setTwitterlink();
  }

  setVerified() {
    this.setState(
      {
        verified: this.state.verified,
      },
      this.setTwitterlink
    );
  }

  setFavs(event) {
    this.setState(
      {
        minFavs: event.value,
      },
      this.setTwitterlink
    );
  }

  setCitiesQuery(city) {
    this.setState(
      {
        citiesQuery: city,
      },
      this.setTwitterlink
    );
  }

  setRequirementsQuery(event) {
    debugger;
    let value = event.target.value;
    console.log("-------", this.state.requirementsQuery);
    console.log("value ", value);
    let temp = [...this.state.requirementsQuery];
    temp.includes(value)
      ? temp.splice(temp.indexOf(value), 1)
      : temp.push(value);
    this.setState(
      {
        requirementsQuery: temp,
      },
      this.setTwitterlink
    );
  }

  setTwitterlink() {
    let url = "https://twitter.com/search?q=";
    // let query = `verified+Bangalore+%28bed+OR+beds+OR+icu+OR+oxygen+OR+ventilator+OR+ventilators%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22need%22+-%22needs%22+-%22required%22+-%22require%22+-%22requires%22+-%22requirement%22+-%22requirements%22+min_faves:10&f=live`;
    let fixedString =
      "-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22need%22+-%22needs%22+-%22required%22+-%22require%22+-%22requires%22+-%22requirement%22+-%22requirements%22";
    let requirementsString = this.state.requirementsQuery.join("+OR+");
    let favs = `min_faves:${this.state.minFavs}`;
    let live = "&lf=on";
    let verified = this.state.verified ? "verified" : "";
    let queryTemplate = `${verified}+${this.state.citiesQuery.toString()}+(${requirementsString})+${fixedString}+${favs}&f=live${live}`;

    this.setState({
      twitterlink: url + queryTemplate,
    });
  }

  getTwitterlink(city) {
    let url = "https://twitter.com/search?q=";
    // let query = `verified+Bangalore+%28bed+OR+beds+OR+icu+OR+oxygen+OR+ventilator+OR+ventilators%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22need%22+-%22needs%22+-%22required%22+-%22require%22+-%22requires%22+-%22requirement%22+-%22requirements%22+min_faves:10&f=live`;
    let fixedString =
      "-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22need%22+-%22needs%22+-%22required%22+-%22require%22+-%22requires%22+-%22requirement%22+-%22requirements%22";
    let requirementsString = this.state.requirementsQuery.join("+OR+");
    let favs = `min_faves:${this.state.minFavs}`;
    let live = "&lf=on";
    let verified = this.state.verified ? "verified" : "";
    let queryTemplate = `${verified}+${city}+(${requirementsString})+${fixedString}+${favs}&f=live${live}`;
    return url + queryTemplate;
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Covid19 Twitter Search</title>
          <meta name="title" content="Covid19 Twitter Search" />
          <meta
            name="description"
            content="As the global community faces the COVID-19 pandemic together, Twitter is helping people find reliable information, connect with others, and follow what???s happening in real time.
This is a simple tool to find resources and leads in Twitter based on your city or need."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://covid19.aaghran.com/" />
          <meta property="og:title" content="Covid19 Twitter Search" />
          <meta
            property="og:description"
            content="As the global community faces the COVID-19 pandemic together, Twitter is helping people find reliable information, connect with others, and follow what???s happening in real time.
This is a simple tool to find resources and leads in Twitter based on your city or need."
          />
          <meta
            property="og:image"
            content="https://wanderingbong-v2.s3.ap-south-1.amazonaws.com/bg-covid.webp"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://covid19.aaghran.com/" />
          <meta property="twitter:title" content="Covid19 Twitter Search" />
          <meta
            property="twitter:description"
            content="As the global community faces the COVID-19 pandemic together, Twitter is helping people find reliable information, connect with others, and follow what???s happening in real time.

This is a simple tool to find resources and leads in Twitter based on your city or need."
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
        </Head>
        {/* <NavBar /> */}
        <Container className="" fluild>
          <Row className="justify-content-md-between mt-2 mb-2">
            <Col sm="12">
              <h1>Covid19 Twitter Resources Search tool</h1>
              <p>
                As the global community faces the COVID-19 pandemic together,
                Twitter is helping people find reliable information, connect
                with others, and follow what???s happening in real time.
              </p>
              <p>
                This is a simple tool to find resources and leads in Twitter
                based on your city or need.
              </p>
              <hr />
              <p>
                Get vaccinated! Help the country to overcome this surge
                <br />
                <Button
                  variant="primary"
                  href="/vaccine-slots"
                  size="sm"
                  className=""
                >
                  Check Vaccination Availability &rarr;
                </Button>
              </p>
              <hr></hr>
              <p>
                <Alert variant="warning">
                  Do NOT make advanced payments. Always check authenticity
                  before any payments.
                </Alert>
              </p>
            </Col>
            <Col sm="12" lg="6">
              <Card className="">
                <Card.Body>
                  <Card.Title>Search</Card.Title>
                  <Card.Text>Choose City</Card.Text>
                  <Form.Group>
                    <Typeahead
                      id="basic-typeahead-multiple"
                      labelKey="name"
                      onChange={this.setCitiesQuery}
                      options={this.state.citiesList}
                      placeholder={"Choose city"}
                      selected={this.state.citiesQuery}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Select resources</Form.Label>
                    <br />
                    <Fragment>
                      {this.state.reqOptions.map((type) => (
                        <Form.Check
                          inline
                          label={type}
                          type="checkbox"
                          className="p-2"
                          id={`inline-checkbox-${type}`}
                          key={`inline-checkbox-${type}`}
                          value={type}
                          defaultChecked={this.state.requirementsQuery.includes(
                            type
                          )}
                          onChange={this.setRequirementsQuery}
                        />
                      ))}
                    </Fragment>
                  </Form.Group>

                  <Button
                    variant="primary"
                    href={this.state.twitterlink}
                    target="_blank"
                    className="mb-4"
                  >
                    View on Twitter &rarr;
                  </Button>
                  <p>Check for replies under the tweets</p>
                  <ListGroup>
                    <ListGroup.Item>
                      <Form.Check
                        inline
                        label={""}
                        type="checkbox"
                        className="p-0"
                        id={`inline-checkbox-verified`}
                        defaultChecked={this.state.verified}
                        onChange={this.setVerified}
                      />
                      Show only verified tweets
                      <br /> (Can try unchecking this for smaller cities if you
                      don't see results)
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      Unverified tweets excluded (Tweet should not contain "not
                      verified" and "unverified")
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Needed & Required words filtered out
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Text className="p-2">
                    In the past few weeks, people have been desperately turning
                    to Twitter asking for leads regarding Covid resources such
                    as oxygen cylinders, covid beds and other assistance like
                    meals for patients, academic help and ccommute.
                    <br />
                    <br />
                    There is a lot of information present on the microblogging
                    site and sometimes it becomes difficult to filter through
                    it, as the information could be old or unverified.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card className="">
                <Card.Body>
                  <Card.Title>Frequently Searched Cities</Card.Title>
                  <ListGroup>
                    {topCities.map((city) => (
                      <ListGroup.Item>
                        <a href={this.getTwitterlink(city)}>{city}</a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <footer className="cntr-footer">
          <b>
            Note - Ad revenue will be contributed to NGOs operating for covid19
            relief.
          </b>
          ?? <a href="https://aaghran.com/">Aaghran Ghosh</a> - 2021
        </footer>
      </Fragment>
    );
  }
}
