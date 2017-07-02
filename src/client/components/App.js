import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Creator from './Creator';
import Drop from './Drop';
import BrowserNotSupported from './BrowserNotSupported';
import '../public/css/App.css';
import 'jquery';
import 'bootstrap';

class NavBarRight extends Component {
    render() {
        return (
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/">Create</a></li>
                </ul>
            </div>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <a className="navbar-brand" href="#">Secure Drop</a>
                        </div>
                        <NavBarRight/>
                    </div>
                </nav>

                <div className="container" role="main">
                    <div className="row">
                        <div className="col-xs-8 col-xs-offset-2">
                            <BrowserRouter>
                                <Switch>
                                    <Route exact path="/" component={Creator}/>
                                    <Route path="/drop/:dropId" component={Drop}/>
                                    <Route path="/supportedBrowsers" component={BrowserNotSupported}/>
                                    <Route render={() => <h1>404</h1>}/>
                                </Switch>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}