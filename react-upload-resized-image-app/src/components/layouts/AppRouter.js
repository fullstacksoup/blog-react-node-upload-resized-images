import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/home';
import AddImageLayout from 'pages/add-image-layout/index';
export default function MainRouter(props) {

  return (
      <div>             
          <Switch>
            <Route exact path="/" component={AddImageLayout} />                        
            <Route exact path="/home" component={Home} />                                                       
            <Route exact path="/form" component={AddImageLayout} />            
          </Switch>               
      </div>
  );
}