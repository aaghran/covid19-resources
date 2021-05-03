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

export default class ngo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Covid19 top organizations figting the pandemic</title>
          <link rel="icon" href="/favicon-32x32.png" />
        </Head>
        <NavBar />
        <Container>
          <h1>Covid19 NGOs</h1>
          <p>
            Quick links of top organizations figting the pandemic
            <br />
            <br /> We will keep updating the content
          </p>
          <Row>
            <Col sm="12">
              <Card className="">
                <Card.Body>
                  <Card.Title>NGOs</Card.Title>
                  <Card.Text className="p-2">
                    <p>
                      Hemkunt Foundation has been helping out with Oxygen
                      Cylinders. 80G donation receipts available.
                    </p>
                    <p>
                      ACT grants has been helping with distribution of oxygen.
                      Run by Indian startup ecosystem. International donations
                      also accepted.
                    </p>
                    <p>
                      Give India are providing sanitary napkins for women
                      affected by the Pandemic.
                    </p>
                    <p>
                      Feeding From Far has been feeding the poor and unemployed
                      who are struggling to feed themselves during the lockdown.
                      Accepts international payments.
                    </p>
                    <p>
                      Swasth along with ACT Grants is procuring oxygen
                      concentrators and channeling them to hospitals in India.
                    </p>
                    <p>
                      Zomato Feeding India are providing hospitals and patients
                      with oxygen and related supplies for free. Accepts
                      international payments.
                    </p>
                    <p>
                      Goonj is providing essentials like ration and hygiene
                      material, with dignity, to daily wagers, migrant workers
                      and people struggling for the basics in the villages of
                      India. Eligible for tax deduction of 50% u/s 80G.
                    </p>
                    <p>
                      Enrich Lives Foundation is providing grocery kits and
                      meals to the poor communities.
                    </p>
                    <p>
                      Paytm Foundation is raising ₹10 crore to donate Oxygen
                      Concentrators across India. They'll match the
                      contributions received through this initiative.
                    </p>
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
