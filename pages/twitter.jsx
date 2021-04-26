import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";

export default function Home() {
  let url = "https://twitter.com/search?q=";
  let query =
    "verified+Bangalore+%28bed+OR+beds+OR+icu+OR+oxygen+OR+ventilator+OR+ventilators%29+-%22not+verified%22+-%22unverified%22+-%22needed%22+-%22need%22+-%22needs%22+-%22required%22+-%22require%22+-%22requires%22+-%22requirement%22+-%22requirements%22+min_faves:10&f=live";
  let min_favs = "+min_faves:10";
  const [citiesQuery, setCitiesQuery] = useState(["Delhi"]);
  const [requirementsQuery, setRequirementsQuery] = useState([]);
  let reqQuery =
    "+%28bed+OR+beds+OR+icu+OR+oxygen+OR+ventilator+OR+ventilators%29";
  const [twitterlink, setTwitterLink] = useState(url + query);

  const [cities] = useState(["Bangalore", "Delhi", "Mumbai", "Hyderabad"]);
  let reqOptions = [
    "Beds",
    "ICU",
    "Oxygen",
    "Ventilator",
    "Tests",
    "Fabiflu",
    "Remdesivir",
    "Plasma",
    "Food",
  ];

  (setTwitterLink) => {
    twitterlink = "test";
  };
  return (
    <Container className="md-container">
      <Head>
        <title>Covid19 Twitter Resources search</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <h1>Covid19 Twitter Resources search</h1>
        <p>{/* Get started by editing <code>pages/index.js</code> */}</p>
        <Container>
          <Row className="justify-content-md-between">
            <Card className="sml-card">
              <Card.Body>
                <Card.Title>Search</Card.Title>
                <Card.Text>Choose City</Card.Text>
                <Form.Group>
                  <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    single
                    onChange={setCitiesQuery}
                    options={cities}
                    placeholder={"Choose city"}
                    selected={citiesQuery}
                  />
                </Form.Group>
                <Card.Text>
                  <Form.Group>
                    <Form.Label>Select resources</Form.Label>

                    <div key={`inline-checkbox`} className="mb-3">
                      {reqOptions.map((type) => (
                        <Form.Check
                          inline
                          label={type}
                          type="checkbox"
                          id={`inline-checkbox-${type}`}
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Card.Text>

                <Button variant="primary" href={twitterlink} target="_blank">
                  View on Twitter &rarr;
                </Button>
              </Card.Body>
            </Card>
          </Row>
          <Row>Top Cities</Row>
        </Container>
      </Container>

      <footer className="cntr-footer">© Aaghran Ghosh - 2021</footer>
    </Container>
  );
}
