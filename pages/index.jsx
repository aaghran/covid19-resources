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
        <p>{/* Get started by editing <code>pages/index.js</code> */}</p>
        <Container>
          <Row className="justify-content-md-between">
          <Button variant="primary" href="/twitter">
                  Search Twitter &rarr;
                </Button>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">© Aaghran Ghosh - 2021</footer>
    </Fragment>
  );
}
