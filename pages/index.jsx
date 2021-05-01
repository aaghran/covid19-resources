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
} from "react-bootstrap";

import NavBar from "../components/nav";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Covid19 Resources wiki</title>
        {/* <link rel="icon" href="/favicon-32x32.png" /> */}
      </Head>
      <NavBar />
      <Container>
        <h1>Covid19 Resources wiki</h1>
        <p>
          This is an informational site for covid created on a personal
          capacity.
          <br /> <br />
          <b>NOTE:</b> Any information here is not official.
        </p>
        <Container fluid>
          <Row className="justify-content-md-between">
            <Card className="">
              <Card.Body>
                <Card.Title>Quick search tool for Twitter</Card.Title>
                <Card.Text className="p-2">
                  In the past few weeks, people have been desperately turning to
                  Twitter asking for leads regarding Covid resources such as
                  oxygen cylinders, covid beds and other assistance like meals
                  for patients, academic help and ccommute.
                  <br /><br />
                  There is a lot of information present on the microblogging
                  site and sometimes it becomes difficult to filter through it,
                  as the information could be old or unverified.
                  <br /><br />
                  Here is a simple and quick tool to search for resources or leads based on a city or requirement. 
                </Card.Text>
                <Button variant="primary" href="/twitter">
                  Search Twitter &rarr;
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">© Aaghran Ghosh - 2021</footer>
    </Fragment>
  );
}
