import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CredentialsTable from './CredentialsTable';
import Error from './Error';
import '../public/css/Creator.css';

class Creator extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.createCredentials = this.createCredentials.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        this.hasDropBeenCreated = this.hasDropBeenCreated.bind(this);
        this.clear = this.clear.bind(this);
        this.hasError = this.hasError.bind(this);
    }

    componentDidMount() {
        const {browserSupportedRequest} = this.props.actions;
        browserSupportedRequest();
    }

    createCredentials() {
        const {createCredentialsRequest} = this.props.actions;
        createCredentialsRequest(this.state.data);
    }

    onDataChange(e) {
        this.setState({data: e.target.value});
    }

    hasDropBeenCreated() {
        return this.props.credentials.length !== 0;
    }

    hasError() {
        return this.props.error;
    }

    getButtonText() {
        return this.hasDropBeenCreated() ? 'Create Another Drop' : 'Create Drop';
    }

    clear() {
        const {clearCredentials} = this.props.actions;
        clearCredentials();
    }

    render() {
        const form = (
            <div className="form-group">
                {this.hasError() && <Error {...this.props}/>}
                <h3>Enter Data To Securely Transfer:</h3>
                <textarea onChange={this.onDataChange} className="form-control" rows="10" readOnly={this.hasDropBeenCreated()}/>
                <button type="button" onClick={this.createCredentials} className="btn btn-primary btn-lg control-button">{this.getButtonText()}</button>
                {this.hasDropBeenCreated() && <button type="button"  className="btn btn-danger btn-lg control-button" onClick={this.clear}>Clear</button>}
                {this.hasDropBeenCreated() && <CredentialsTable {...this.props}/>}
            </div>
        );

        return this.props.supported ? form : <div/>;
    }
}

const mapStateToProps = (state) => ({
    credentials: state.credentials.list,
    supported: state.browser.supported,
    error: state.credentials.error
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Creator);