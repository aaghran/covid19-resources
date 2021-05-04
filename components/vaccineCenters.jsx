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

import SessionsFormatter from "./SessionsFormatter";

class VaccineSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   centers: [],
    };

    // this.setDistrict = this.setDistrict.bind(this);
  }
  render() {
    console.log(this.props);
    let { centers } = this.props;
    return (
      <Fragment>
        {centers.map((row) => (
          <Card className="mb-4" key={row.center_id}>
            <Row>
              <Col sm="12" md="6">
                <Card className="p-2 border-0">
                  <Card.Title>{row.name} </Card.Title>
                  <Card.Text>
                    {`${row.block_name}, ${row.district_name}, ${row.state_name}`}
                    <br />
                    {row.pincode}
                  </Card.Text>
                </Card>
              </Col>
              <Col sm="12" md="6">
                <SessionsFormatter row={row} />
              </Col>
            </Row>
          </Card>
        ))}
      </Fragment>
    );
  }
}

export default VaccineSlots;
