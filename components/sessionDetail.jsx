import { useState } from "react";
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
  Badge,
  Alert,
  Modal,
} from "react-bootstrap";
export default function sessionDetail(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { row } = props;
  return (
    <>
      <Button variant="outline-secondary" size="sm" onClick={handleShow}>
        View Slots
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {row.name}
            <Badge variant="success" pill className="ml-2">
              {row.fee_type}
            </Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {row.sessions.map((session) => (
            <>
              {session.available_capacity ? (
                <Card className="mb-4" key={row.center_id}>
                  <Row>
                    <Col sm="12">
                      <Card className="p-2 border-0">
                        <Card.Title>
                          <Badge variant="light">{session.date}</Badge>
                          <br /><br />
                          {" > "}
                          {session.min_age_limit} {"years "}
                          {session.vaccine}
                        </Card.Title>

                        {session.slots.toString()}
                        <br /><br />
                        <Badge variant="success" className="p-2">
                          {"Available slots "}
                          {session.available_capacity}
                        </Badge>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              ) : (
                ""
              )}
            </>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
