import './App.css';
import UserStore from './stores/UserStore';
import React from 'react';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  async componentDidMount() {
    try {

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
        }
      });

      let result = await res.json();
      console.log('isLoggedIn result: ' + result);

      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.loading = false;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    } catch (error) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

  }

  async doLogout() {
    try {

      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

    } catch (error) {
      console.log(error);
    }

  }

  render() {

    if(UserStore.loading) {
      return ( 
        <div className = "app" >
          <div className ="container">
              Loading, please wait...
          </div>
        </div>
      );
    }
    else{

      if(UserStore.isLoggedIn){
        return ( 
          <div className = "app" >
            <div className ="container">
                Welcome {UserStore.username}

              <Button variant="primary" type="button" onClick={() => this.doLogout()}>
                Logout
              </Button>
            </div>
          </div>
        );
      }
      return ( 
        <div className = "app" >
          <div className='containerforLogin'>
          
          <h1> Sign In </h1>

            <LoginForm />
            </div>
        </div>
      );
    }
  }
}

export default observer(App);