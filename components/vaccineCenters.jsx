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

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

const selectOptions = {
  No: "No",
  Yes: "Yes",
};

const columns = [
  {
    dataField: "name",
    text: "Center Name",
    sort: true,
    formatter: nameFormatter,
    filter: textFilter(),
  },
  {
    dataField: "pincode",
    text: "Pincode",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "fee_type",
    text: "Fee Type",
    sort: true,
  },
  {
    dataField: "session",
    text: "Sessions",
    formatter: sessionsFormatter,
  },
  {
    dataField: "available",
    text: "available",
    formatter: availableFormatter,
    sort: true,
  },
];

function nameFormatter(cell, row) {
  return (
    <>
      <Badge variant="dark">{row.center_id}</Badge>
      <Badge>{cell}</Badge>
      <br />
      <Badge>{`${row.block_name}, ${row.district_name}, ${row.state_name}`}</Badge>
    </>
  );
}

function sessionsFormatter(cell, row) {
  let sessions = row.sessions.filter(
    (session) => session.available_capacity > 6
  );
  return (
    <>
      {sessions.map((session) => (
        <>
          <Alert variant="success" className="p-0">
            <Badge>{session.date}</Badge>
            <Badge>Age - {session.min_age_limit}</Badge>
            Slots - <Badge variant="dark"> {session.available_capacity}</Badge>
          </Alert>
        </>
      ))}
    </>
  );
}
function availableFormatter(cell, row) {
  let sessions = row.sessions.filter(
    (session) => session.available_capacity > 0
  );
  return (
    <>
      <Badge pill variant={sessions.length ? "success" : "danger"}>
        {sessions.length ? "Yes" : "No"}
      </Badge>
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
