import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/dropActions';
import {AWAITING_PASSWORD, DECRYPTED, NOT_FOUND} from '../constants/dropStates';
import Error from './Error';
import PasswordEntry from './PasswordEntry';

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
            case NOT_FOUND:
                return <Error error={this.props.drop.error}/>;
            default:
                return <div/>;
        }
    }
}

const mapStateToProps = (state) => ({
    drop: state.drop,
    error: state.drop.error
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Drop);