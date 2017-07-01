import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Creator from './Creator';
import Drop from './Drop';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Creator}/>
                    <Route path="/drop/:dropId" component={Drop}/>
                    <Route render={() => <h1>404</h1>}/>
                </Switch>
            </BrowserRouter>
        );
    }
}




