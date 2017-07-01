import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/credentialActions';

class Credentials extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.credentials.link}</td>
                <td>{this.props.credentials.password}</td>
            </tr>
        );
    }
}

class CredentialsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const credentials = [];

        this.props.credentials.forEach((credentialsInstance, index) => {
            credentials.push(<Credentials key={index} credentials={credentialsInstance}/>);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Link</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                {credentials}
                </tbody>
            </table>
        );
    }
}

class Creator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
        this.createCredentials = this.createCredentials.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
    }

    createCredentials() {
        const {createCredentialsRequest} = this.props.actions;
        createCredentialsRequest(this.state.data);
    }

    onDataChange(e) {
        this.setState({data: e.target.value});
    }

    getButtonText() {
        if(this.props.credentials.length === 0) {
            return 'Create Drop';
        }
        return 'Create Another Drop';
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Creator</h1>
                <textarea onChange={this.onDataChange} defaultValue={'Type here'}/>
                <button onClick={this.createCredentials}>{this.getButtonText()}</button>
                {this.props.credentials.length > 0 && <CredentialsTable {...this.props}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.credentials.list
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Creator);