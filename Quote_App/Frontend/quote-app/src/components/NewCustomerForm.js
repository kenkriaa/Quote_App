import React, {useEffect, useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import "../style/Customer.css";


export default function NewCustomerForm({data, setShowModal}){

    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [taxnumber, setTaxnumber] = useState('');
    const [bankaccount, setBankaccount] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [website, setWebsite] = useState('');



    const [show, setShow] = useState(data);

    useEffect( () => {
        console.log('Modal');
    });

    const createCustomer = () => {
        console.log('Name: ' + companyName);
        console.log('Address: ' + address);
        fetch("/newCustomer", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyName: companyName,
                address: address,
              })
          })
    };

    function showChanged(value){
        setShowModal(value);
    }

    return(
        <Modal show={true}>
            <Modal.Header closeButton onHide={() => showChanged(false)}>
                <Modal.Title>Új vevő</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCompanyName">
                        <Form.Label>Cég név</Form.Label>
                        <Form.Control type="text" value={companyName} onChange={ (e) => {setCompanyName(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTaxNR">
                        <Form.Label>Adószám</Form.Label>
                        <Form.Control type="text" value={taxnumber} onChange={(e) => setTaxnumber(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBankAccount">
                        <Form.Label>Bankszámlaszám</Form.Label>
                        <Form.Control type="text" value={bankaccount} onChange={(e) => setBankaccount(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                        <Form.Label>Ország</Form.Label>
                        <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>Város</Form.Label>
                        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Cím</Form.Label>
                        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPostalCode">
                        <Form.Label>Irányítószám</Form.Label>
                        <Form.Control type="text" value={postalcode} onChange={(e) => setPostalcode(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicWebsite">
                        <Form.Label>Honlap</Form.Label>
                        <Form.Control type="text" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ () => showChanged(false)}>Bezár</Button>
                <Button variant="primary" onClick={createCustomer}>Mentés</Button>
            </Modal.Footer>
        </Modal>
    );

}