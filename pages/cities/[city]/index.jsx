import Head from "next/head";
import { Fragment, useState, useEffect } from "react";
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
  Tabs,
  Tab,
} from "react-bootstrap";

import NavBar from "../../../components/nav";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import data from "../../../data/resources.json";

const Cities = () => {
  const router = useRouter();
  const { city } = router.query;
  const [key, setKey] = useState("hospitals");

  console.log(city);
  let cityData = [];
  useEffect(
    () => {
      cityData = data.data.citiesCovids.filter(function (i, n) {
        return n.slug == city;
      });
    },
    city,
    cityData
  );
  console.log(cityData);

  return (
    <>
      <Head>
        <title>{city} Covid19 links and resources</title>
        <meta name="title" content={`${city} Covid19 links and resources`} />
        <meta
          name="description"
          content={`${city} Covid19 links and resources`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://covid19.aaghran.com/" />
        <meta property="og:title" content="Covid19 Resources wiki" />
        <meta
          property="og:description"
          content={`${city} Covid19 links and resources`}
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
          content={`${city} Covid19 links and resources`}
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
            <Col sm="12">
              <h1 className="mt-2">{`${city} Covid19 links and resources`}</h1>
              <p>
                This is an informational site for covid created on a personal
                capacity.
                <br />
                <b>NOTE:</b> Any information here is not official.
              </p>
            </Col>
            <Col sm="12" lg="6" className="mt-2">
              <Card className="">
                <Card.Body>
                  <Card.Title>Important Links</Card.Title>
                  <Card.Text className="p-2">Covid guide - Instagram</Card.Text>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="hospitals" title="Hospitals">
                      <Card.Body className="p-2">
                        Covid guide - Instagram
                      </Card.Body>
                    </Tab>
                    <Tab eventKey="Oxygen" title="Oxygen">
                      <Card.Body className="p-2">Oxygen</Card.Body>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6" className="mt-2">
              <Card className="">
                <Card.Body>
                  <Card.Title>Covid Dashboards</Card.Title>
                  <Card.Text className="p-2"></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6" className="mt-2">
              <Card className="">
                <Card.Body>
                  <Card.Title>Important Phone Numbers</Card.Title>
                  <Card.Text className="p-2"></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6" className="mt-2">
              <Card className="">
                <Card.Body>
                  <Card.Title>Twitter</Card.Title>
                  <Card.Text className="p-2"></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6" className="mt-2">
              <Card className="">
                <Card.Body>
                  <Card.Title>Vaccination</Card.Title>
                  <Card.Text className="p-2"></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Cities;
