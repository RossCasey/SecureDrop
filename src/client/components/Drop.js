import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dropActions';
import {
    AWAITING_PASSWORD,
    DECRYPTED,
    ERROR
} from '../constants/dropStates';

class Spinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>Spinner!</p>
        );
    }
}

class PasswordEntry extends Component {
    constructor(props) {
        super(props);
        this.submitPassword = this.submitPassword.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.state = {password:''};
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    submitPassword(e) {
        e.preventDefault();
        this.props.decrypt(this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.submitPassword}>
                <input onChange={this.onPasswordChange} type="password"/>
                <button>Decrypt</button>
            </form>
        )
    }
}

class DropDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.data}</div>
        );
    }
}

class Error extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.error}</h1>
            </div>
        );
    }
}

class Drop extends Component {
    constructor(props) {
        super(props);
        this.decryptDrop = this.decryptDrop.bind(this);
    }

    componentDidMount() {
        const dropId = this.props.match.params.dropId;
        const {getDropRequest} = this.props.actions;
        getDropRequest(dropId);
    }

    decryptDrop(password) {
        const {cipherText} = this.props.drop;
        const {decryptDropRequest} = this.props.actions;
        decryptDropRequest(password, cipherText);
    }

    render() {
        const status = this.props.drop.status;
        console.log(this.props);
        switch(status) {
            case AWAITING_PASSWORD:
                return <PasswordEntry decrypt={this.decryptDrop}/>;
            case ERROR:
                return <Error error={this.props.drop.error}/>;
            case DECRYPTED:
                return <DropDisplay data={this.props.drop.plainText}/>;
            default:
                return <Spinner/>;
        }
    }
}

const mapStateToProps = (state) => ({
    drop: state.drop
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Drop);