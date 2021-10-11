import { React, useEffect, useState } from "react";

function CustomerRecordPage(props) {

    useEffect( () => {
        console.log(props.location.state.data)
        }
    );

    return (
      <div className='home'>
        <h1>CustomerRecordPage</h1>
      </div>
    );
  }
  
  export default CustomerRecordPage;