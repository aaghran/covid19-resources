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

import NavBar from "../components/nav";
import { Typeahead } from "react-bootstrap-typeahead";
const topCities = ["Delhi", "Pune", "Mumbai", "Bangalore", "Nagpur", "Kolkata"];

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Covid19 City wise resources and links</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <NavBar />
        <Container>
          <h1>Covid19 State/City wise important links</h1>
          <p>
            Quick links and guides for top cities.
            <br />
            <br /> We will keep updating the content
          </p>
          <Row>
            <Col sm="12">
              <Card className="">
                <Card.Body>
                  <Card.Title>Search resources by City</Card.Title>
                  <Card.Text className="p-2">
                    <ListGroup>
                      {topCities.map((city) => (
                        <ListGroup.Item>
                          <a href={`/cities/${city}`}>{city}</a>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Text>
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
