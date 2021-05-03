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
} from "react-bootstrap";

import NavBar from "../components/nav";
import Image from "next/image";

const topCities = ["Delhi", "Pune", "Mumbai", "Bangalore", "Nagpur", "Kolkata"];

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Head>
          <title>Covid19 Resources wiki</title>
          <meta name="title" content="Covid19 Resources wiki" />
          <meta
            name="description"
            content="In the past few weeks, people have been desperately turning to Twitter asking for leads regarding Covid resources such as oxygen cylinders, covid beds and other assistance like meals for patients, academic help and ccommute. There is a lot of information present on the microblogging site and sometimes it becomes difficult to filter through it, as the information could be old or unverified."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://covid19.aaghran.com/" />
          <meta property="og:title" content="Covid19 Resources wiki" />
          <meta
            property="og:description"
            content="In the past few weeks, people have been desperately turning to Twitter asking for leads regarding Covid resources such as oxygen cylinders, covid beds and other assistance like meals for patients, academic help and ccommute.There is a lot of information present on the microblogging site and sometimes it becomes difficult to filter through it, as the information could be old or unverified."
          />
          <meta
            property="og:image"
            content="https://wanderingbong-v2.s3.ap-south-1.amazonaws.com/bg-covid.webp"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://covid19.aaghran.com/" />
          <meta property="twitter:title" content="Covid19 Resources wiki" />
          <meta
            property="twitter:description"
            content="In the past few weeks, people have been desperately turning to Twitter asking for leads regarding Covid resources such as oxygen cylinders, covid beds and other assistance like meals for patients, academic help and ccommute.
There is a lot of information present on the microblogging site and sometimes it becomes difficult to filter through it, as the information could be old or unverified."
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
        </Head>
        <NavBar />
        <Container>
          <Container fluid>
            <Row className="justify-content-md-between">
              <Col sm="12" className="mb-2">
                <h1 className="mt-2">Covid19 Resources wiki</h1>
                <p>
                  This is an informational site for covid created on a personal
                  capacity.
                  <br /> <br />
                  <b>NOTE:</b> Any information here is not official.
                </p>
                <p>
                  <a href="https://www.covid19india.org" target="blank">Covid19 cases</a>
                  <br />A volunteer-driven crowdsourced effort to track the coronavirus in India.
                </p>
                <span>Quick links: </span>
                <Button variant="outline-primary" href="/twitter-search" className="ml-2">
                  Search Twitter &rarr;
                </Button>
              </Col>
              <Col sm="12" lg="6" className="mt-2">
                <Card className="">
                  <Card.Body>
                    <Card.Title>Quick search tool for Twitter</Card.Title>
                    <Card.Text className="p-2">
                      In the past few weeks, people have been desperately
                      turning to Twitter asking for leads regarding Covid
                      resources such as oxygen cylinders, covid beds and other
                      assistance like meals for patients, academic help and
                      ccommute.
                      <br />
                      <br />
                      There is a lot of information present on the microblogging
                      site and sometimes it becomes difficult to filter through
                      it, as the information could be old or unverified.
                      <br />
                      <br />
                      Here is a simple and quick tool to search for resources or
                      leads based on a city or requirement.
                    </Card.Text>
                    <Button
                      variant="primary"
                      href="/twitter-search"
                      size="lg"
                      block
                    >
                      Search Twitter &rarr;
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="12" lg="6" className="mt-2">
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
                    <Button variant="primary" href="/city-search">
                      Search By City &rarr;
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="12" lg="6" className="mt-2">
                <Card className="">
                  <Card.Body>
                    <Card.Title>Some crowdsourced projects</Card.Title>
                    <Card.Text>
                      <b>COVIDSoS</b> <br />
                      Created by Twitter user @sri_mash, Covidsos.live is a
                      chatbot that curates relevant Twitter posts with verified
                      keywords. Once an option is selected, the website asks
                      users to fill in their city following which users can view
                      relevant Twitter posts. Click here for{" "}
                      <a
                        href="https://www.covidsos.live/app/index.html"
                        target="_blank"
                      >
                        COVIDSoS website.
                      </a>
                    </Card.Text>
                    <Card.Text>
                      <b>COVID hospital data</b> <br />
                      Citizens of Delhi and Banglore can use this website to
                      find available hospital beds in their vicinity. The
                      website marks hospitals with available beds in green and
                      others in red.{" "}
                      <a
                        href="https://covid-19-hospital-data.el.r.appspot.com/?location=Bengaluru_Government&onlyGreen=true"
                        target="_blank"
                      >
                        Click here for the website.
                      </a>
                    </Card.Text>
                    <Card.Text>
                      <b>COVID Resources</b> <br />
                      COVID Resources website has a state-wise list of contact
                      numbers for oxygen, beds, antiviral drugs, ventilators
                      among other things. The portal also hosts lists of
                      remdesivir and tocilizumab distributors.{" "}
                      <a
                        href="https://covidresources.netlify.app/"
                        target="_blank"
                      >
                        Click here for the website.
                      </a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="12" lg="6" className="mt-2">
                <Card className="">
                  <Card.Body>
                    <Card.Title>Plasma Donation Resources :</Card.Title>
                    <Card.Text className="">
                      <ListGroup.Item>
                        <a href="https://www.dhoondh.com/" target="blank">
                          https://www.dhoondh.com/
                        </a>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a href="https://plasmadonor.in" target="blank">
                          https://plasmadonor.in
                        </a>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a href="https://needplasma.in" target="blank">
                          https://needplasma.in
                        </a>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a href="https://plasmaline.in" target="blank">
                          https://plasmaline.in
                        </a>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a
                          href="https://delhifightscorona.in/requestplasma/"
                          target="blank"
                        >
                          https://delhifightscorona.in/requestplasma/
                        </a>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <a
                          href="https://www.instagram.com/plasmadonors.delhi/"
                          target="blank"
                        >
                          https://www.instagram.com/plasmadonors.delhi/
                        </a>
                      </ListGroup.Item>
                    </Card.Text>
                  </Card.Body>
                </Card>
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
