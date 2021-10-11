import { React, useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import NewCustomerForm from "../components/NewCustomerForm";
import { useHistory } from "react-router-dom";
import Pagination from "../components/Paginator";


import "../style/Customer.css";

function Customer() {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["CompanyName"]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  //get customer data from the database, calling the nodejs API
  useEffect(() => {
    fetch("/getCustomers", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseObject) => {
        setData(JSON.parse(responseObject.data));
        setColumns(JSON.parse(responseObject.columnNames));
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);



  function searchCustomer(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  //open the selected customer record
  const openRecord = (recordData) => {
    console.log("Data: " + JSON.stringify(recordData));
    history.push(`/CustomerRecordPage/${recordData.idCustomer}`, { data: recordData });
  };

  const createRecord = () => {
    setShowNewModal(true);
  };

  const setShowModal = (value) => {
    setShowNewModal(value);
  };

  // Get current posts
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="customerPage">
      <h1 className="title">Vevők</h1>

      {/* New Customer button */}
      <Button
        className="newCustomerButton"
        variant="primary"
        onClick={createRecord}
      >
        Új Vevő
      </Button>

      <div className="customerTable">
        <p className="searchText">Válassza ki mi szerint szeretne keresni:</p>

        {/* Checkboxes for selecting the columns to search*/}
        <Form>
          <div key={`inline-checkbox}`} className="">
            { Object.keys(columns).map((column) => (
                <Form.Check
                  inline
                  label={columns[column]}
                  type="checkbox"
                  id={column}
                  checked={searchColumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchColumns.includes(column);
                    setSearchColumns((prev) =>
                      checked
                        ? prev.filter((sc) => sc !== column)
                        : [...prev, column]
                    );
                  }}
                />
              ))}
          </div>
        </Form>

        {/* Searchfield for the customer datatable */}
        <div className="searchField">
          <InputGroup>
            <FormControl
              aria-label="Keresni kívánt adat"
              aria-describedby="basic-addon2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2">
              Keresés
            </Button>
          </InputGroup>
        </div>

        <p className="datatableTitle">Vevők</p>

        {/* Customer datatable */}
        <Datatable columns={columns} data={searchCustomer(currentRecords)} onRowClick={openRecord} />

        <Pagination
          postsPerPage={recordsPerPage}
          totalPosts={data.length}
          paginate={paginate}
      />

        {/* Create new Customer */}
        {showNewModal ? (
          <NewCustomerForm data={showNewModal} setShowModal={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

export default Customer;
