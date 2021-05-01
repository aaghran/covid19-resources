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

export default class Welcome extends React.Component {
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
          <title>Covid19 Twitter Resources search</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <NavBar />
        <Container className="" fluild>
          <Row className="justify-content-md-between mt-2 mb-2">
            <Col sm="12">
              <h1>Covid19 Twitter Resources Search tool</h1>
              <p>
                As the global community faces the COVID-19 pandemic together,
                Twitter is helping people find reliable information, connect
                with others, and follow what’s happening in real time.
              </p>
              <p>
                This is a simple tool to find resources and leads in Twitter
                based on your city or need.
              </p>
              <hr></hr>
              <p>
                <b>
                  Do NOT make advanced payments. Always check authenticity
                  before any payments.
                </b>
                <br />
                Check for replies under the tweets
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

        <footer className="cntr-footer">© Aaghran Ghosh - 2021</footer>
      </Fragment>
    );
  }
}
