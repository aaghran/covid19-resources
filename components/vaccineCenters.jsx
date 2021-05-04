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

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

const selectOptions = {
  Free: "Free",
  Paid: "Paid",
};

const columns = [
  {
    dataField: "pincode",
    text: "Center Name",
    sort: true,
    formatter: nameFormatter,
  },
  {
    dataField: "fee_type",
    text: "Fee Type",
    sort: true,
    formatter: feeFormatter,
    // filter: selectFilter({
    //   options: selectOptions,
    // }),
  },
  {
    dataField: "session",
    text: "Slots",
    formatter: sessionsFormatter,
  },
];

function nameFormatter(cell, row) {
  return (
    <>
      <Badge variant="dark">{row.center_id}</Badge>
      <Badge>{row.name}</Badge>
      <br />
      <Badge>{`${row.block_name}, ${row.district_name}, ${row.state_name}`}</Badge>
      <br />
      <Badge variant="warning" pill>
        {row.pincode}
      </Badge>
    </>
  );
}

function sessionsFormatter(cell, row) {
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
function feeFormatter(cell, row) {
  return (
    <>
      <Button block disabled variant={cell == "Free" ? "" : "warning"}>
        {cell}
      </Button>
    </>
  );
}

const expandRow = {
  onlyOneExpanding: true,
  renderer: (row) => (
    <div>
      <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
      <p>
        You can render anything here, also you can add additional data on every
        row object
      </p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
};

class VaccineSlots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
    };

    // this.setDistrict = this.setDistrict.bind(this);
  }
  render() {
    return (
      <Fragment>
        <BootstrapTable
          keyField="id"
          data={this.props.centers}
          columns={columns}
          hover
          condensed
          //   expandRow={expandRow}
          filter={filterFactory()}
          borderless
          responsive
        />
      </Fragment>
    );
  }
}

export default VaccineSlots;
