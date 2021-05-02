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

import NavBar from "../../../components/nav";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const topCities = ["Delhi", "Pune", "Mumbai", "Bangalore", "Nagpur", "Kolkata"];

const Cities = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <>
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
            <Col sm="12">
              <h1 className="mt-2">{city}</h1>
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
                  <Card.Title>Quick search tool for Twitter</Card.Title>
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
