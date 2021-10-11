import React from 'react';
import Table from 'react-bootstrap/Table'

export default function Datatable({data, onRowClick, columns}){

    return (
        <Table striped bordered hover >
            <thead>
                <tr>
                    {Object.values(columns).map( (columnName) => <th>{columnName}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map( row => 
                    <tr key={row['id']} onClick={ () => onRowClick(row)}>
                        {
                            Object.keys(columns).map((key) => <td>{row[key]}</td>)
                        }
                    </tr>            
                )}
            </tbody>
        </Table>
    );
}