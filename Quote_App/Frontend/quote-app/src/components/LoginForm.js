import React from 'react';
import UserStore from '../stores/UserStore';
import { flowResult } from 'mobx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      buttondisabled: false
    }
  }

  setInputValue(event){
    let fieldvalue = event.target.value;
    let fieldName = event.target.name;
    fieldvalue = fieldvalue.trim();
    if(fieldvalue.length > 12){
      return;
    }
    this.setState({
      [fieldName]: fieldvalue
    });
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttondisabled: false
    })
  }

  async doLogIn(){
    console.log('login');
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }
    this.setState({
      buttondisabled: true
    })

    try{
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let loginResult = await res.json();
      if(loginResult && loginResult.success){
        UserStore.isLoggedIn = true;
        UserStore.username = loginResult.username;
      }else if(loginResult && loginResult.success === false){
        this.resetForm();
        alert(loginResult.msg);
      }

    }catch(e){
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return ( 
    <React.Fragment>
      <Form className="loginForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="text" placeholder="Username" value={this.state.username ? this.state.username : ''} onChange={(event) => this.setInputValue(event)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.password ? this.state.password : ''} onChange={(event) => this.setInputValue(event)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Stay logged in" />
        </Form.Group>
        <Button className="loginButton" variant="primary" type="button" onClick={() => this.doLogIn()}>
          Login
        </Button>
      </Form>
      </React.Fragment>
    );
  }
}

export default LoginForm;