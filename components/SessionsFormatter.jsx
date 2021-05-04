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
  Badge,
  Alert,
} from "react-bootstrap";

import moment from "moment";

function SessionsFormatter(row) {
  return (
    <>
      {session18.total_slots ? (
        <>
          <Card>
            <Card.Body>
              <Card.Subtitle>
                {"Above 45 years"}{" "}
                <Badge variant="success" className="p-2">
                  {" "}
                  {session18.total_slots}
                </Badge>
              </Card.Subtitle>
              <Card.Subtitle className="m-2 text-muted">
                {session18.vaccine}
              </Card.Subtitle>
              <Card.Subtitle className="m-2 text-muted">
                Dates - {session18.date.toString()}
              </Card.Subtitle>
              {/* <Card.Link href="#">View Slots and details</Card.Link> */}
            </Card.Body>
          </Card>
        </>
      ) : (
        ""
      )}

      {session45.total_slots ? (
        <>
          <Card>
            <Card.Body>
              <Card.Subtitle>
                {"Above 45 years"}{" "}
                <Badge variant="success" className="p-2">
                  {" "}
                  {session45.total_slots}
                </Badge>
              </Card.Subtitle>
              <Card.Subtitle className="m-2 text-muted">
                {session45.vaccine}
              </Card.Subtitle>
              <Card.Subtitle className="m-2 text-muted">
                Dates - {session45.date.toString()}
              </Card.Subtitle>
              {/* <Card.Link href="#">View Slots and details</Card.Link> */}
            </Card.Body>
          </Card>
        </>
      ) : (
        ""
      )}
    </>
  );
}
class VaccineSlots extends React.Component {
  render() {
    let row = this.props.row;
    let sessions = row.sessions.filter(
      (session) => session.available_capacity > 0
    );
    let session18 = { vaccine: "", date: [], total_slots: 0 };
    let session45 = { vaccine: "", date: [], total_slots: 0 };
    {
      sessions.map((session) => {
        if (session.min_age_limit == 18) {
          session18.vaccine = session.vaccine;
          session18.date.push(moment(session.date, "DD-MM-YYYY").format("Do"));
          session18.total_slots += session.available_capacity;
        }

        if (session.min_age_limit == 45) {
          session45.vaccine = session.vaccine;
          session45.date.push(moment(session.date, "DD-MM-YYYY").format("Do"));
          session45.total_slots += session.available_capacity;
        }
      });
    }
    console.log(this.props);
    return (
      <>
        {session18.total_slots ? (
          <>
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-start">
                      <i class="icon-pencil primary font-large-2 float-left"></i>

                      <h5>
                        <i class="fas fa-restroom"></i>
                        {"18-45 years"}
                      </h5>
                      <span>
                        <i class="fas fa-syringe mr-1"></i>
                        {session18.vaccine}
                      </span>
                      <br />
                      <Badge
                        variant={row.fee_type == "Free" ? "success" : "warning"}
                      >
                        {row.fee_type}
                      </Badge>
                    </div>
                    <div class="media-body text-right">
                      <h3>{session18.total_slots}</h3> {"Available Slots"}
                      <p className="mt-2">
                        <i class="far fa-calendar-check"></i>
                        {session18.date.map((date) => (
                          <Badge variant="dark" pill className="p-2 mr-1">
                            {date}
                          </Badge>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {session45.total_slots ? (
          <>
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <div class="media d-flex">
                    <div class="align-self-start">
                      <i class="icon-pencil primary font-large-2 float-left"></i>

                      <h5>
                        <i class="fas fa-restroom"></i>
                        {"> 45 years"}
                      </h5>
                      <p>
                        <i class="fas fa-syringe mr-1"></i>
                        {session45.vaccine}
                      </p>
                      <br />
                      <Badge
                        variant={row.fee_type == "Free" ? "success" : "warning"}
                      >
                        {row.fee_type}
                      </Badge>
                    </div>
                    <div class="media-body text-right">
                      <h3>{session45.total_slots}</h3> {"Available Slots"}
                      <p className="mt-2">
                        <i class="far fa-calendar-check"></i>
                        {session45.date.map((date) => (
                          <Badge variant="dark" pill className="p-2 mr-1">
                            {date}
                          </Badge>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default VaccineSlots;
