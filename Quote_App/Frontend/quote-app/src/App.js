import './App.css';
import UserStore from './stores/UserStore';
import React from 'react';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Quote from './pages/Quote';


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
          <>
          <Router>
              <Sidebar />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Customer' component={Customer} />
                <Route path='/Quote' component={Quote} />
              </Switch>
            </Router>
            </>
        );
      }
      return ( 
        <div className = "app" >
          <div className='containerforLogin'>
          <h1> Bejelentkezés </h1>
            <LoginForm />
            </div>
        </div>
      );
    }
  }
}

export default observer(App);