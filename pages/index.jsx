import Head from "next/head";
import {
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  let gallery = props.gallery;
  let nextSeoConfig = {
    title: `${gallery.name} | Wandering Bong`,
      description: `${gallery.description}`,
    openGraph: {
      url: `https://wanderingbong.com/galleries/${gallery.slug}`,
      title: `${gallery.name} | Wandering Bong`,
      description: `${gallery.description}`,
      site_name: "Wandering Bong | Traveller | India",
      images: props.images,
    },
    twitter: {
      handle: "@aaghran",
      site: "@site",
      cardType: "summary_large_image",
    },
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
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>C</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="inlineFormInputGroupUsername"
                    placeholder="City"
                  />
                </InputGroup>
                <Card.Text>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Select resources</Form.Label>
                    <Form.Control as="select" multiple>
                      <option>Beds</option>
                      <option>ICU</option>
                      <option>Oxygen</option>
                      <option>Ventilator</option>
                      <option>Tests</option>
                      <option>Fabiflu</option>
                      <option>Remdesivir</option>
                      <option>Favipiravir</option>
                      <option>Tocilizumab</option>
                      <option>Plasma</option>
                      <option>Food</option>
                    </Form.Control>
                  </Form.Group>
                </Card.Text>

                <Button variant="primary" href="https://nextjs.org/docs">
                  View on Twitter &rarr;
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Container>

      <footer className="cntr-footer">Aaghran Ghosh</footer>
    </Container>
  );
}
