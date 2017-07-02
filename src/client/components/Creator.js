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
                <button type="button" onClick={this.createCredentials} className="btn btn-primary btn-lg spacer">{this.getButtonText()}</button>
                {this.hasDropBeenCreated() && <button type="button"  className="btn btn-danger btn-lg spacer" onClick={this.clear}>Clear</button>}
                {this.hasDropBeenCreated() && <CredentialsTable {...this.props}/>}
                <div className="well spacer">
                    <h3>FAQ</h3>
                    <h4>What is this?</h4>
                    <p>
                        Secure drop is a service that allows text data to be sent securely from one person to another
                        without the need to setup complicated systems.
                    </p>
                    <h4>How does it work?</h4>
                    <p>
                        You enter your text and click 'create drop'. A link and password will be generated. It is
                        recommended that you send the link and password to the recipient over different channels.
                    </p>
                    <h4>Is my data secure?</h4>
                    <p>
                        Your data is using industry standard AES-GCM-128. This ensures that your data is protected from
                        malicious third-parties.
                    </p>
                    <h4>Can you see my data?</h4>
                    <p>
                        Your data is encrypted before it ever leaves the browser. This means that the server only contains
                        an encrypted version of your data that is useless without the password.
                    </p>
                    <h4>How long is the drop valid for?</h4>
                    <p>
                        Each drop is valid for 24 hours after its creation.
                    </p>
                    <h4>Can I send the link to multiple people?</h4>
                    <p>
                        No, each link is only valid for one use. You can, however, create multiple drops with the same data by
                        clicking the 'Create Drop' button again.
                    </p>
                    <h4>What browsers are supported?</h4>
                    <p>
                        The list of supported browsers is available <a href="/supportedBrowsers">here.</a>
                    </p>
                    <h4>Can I host my own instance of Secure Drop?</h4>
                    <p>
                        Yes you can, Secure Drop is fully open source. See the repository <a href="https://www.github.com/RossCasey/SecureDrop">here</a> for installation
                        instructions.
                    </p>
                </div>
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