import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import {AWAITING_PASSWORD, DECRYPTED, UNRECOVERABLE} from '../constants/dropStates';
import Error from './Error';
import PasswordEntry from './PasswordEntry';

class Drop extends Component {
    constructor(props) {
        super(props);
        this.decryptDrop = this.decryptDrop.bind(this);
    }

    componentDidMount() {
        const dropId = this.props.match.params.dropId;
        const {browserSupportedRequest} = this.props.actions;
        browserSupportedRequest(true, dropId);
    }

    decryptDrop(password) {
        const {cipherText} = this.props.drop;
        const {decryptDropRequest} = this.props.actions;
        decryptDropRequest(password, cipherText);
    }

    render() {
        const status = this.props.drop.status;
        switch(status) {
            case AWAITING_PASSWORD:
                return (
                    <div>
                        {this.props.error && <Error {...this.props}/>}
                        <PasswordEntry decrypt={this.decryptDrop}/>
                    </div>
                );
            case DECRYPTED:
                return (
                    <div>
                        <h3>Decrypted Data:</h3>
                        <textarea className="form-control" rows="10" readOnly={true} value={this.props.drop.plainText}/>
                    </div>
                );
            case UNRECOVERABLE:
                return <Error error={this.props.drop.error}/>;
            default:
                return <div/>;
        }
    }
}

const mapStateToProps = (state) => ({
    drop: state.drop,
    supported: state.browser.supported,
    error: state.drop.error
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Drop);