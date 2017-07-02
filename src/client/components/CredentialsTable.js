import React, { Component } from 'react';
import '../public/css/CredentialsTable.css';
import Clipboard from 'clipboard';

class Credentials extends Component {
    constructor(props) {
        super(props);
        this.onLinkCopy = this.onLinkCopy.bind(this);
        this.getLinkHighlightClass = this.getLinkHighlightClass.bind(this);
        this.onPasswordCopy = this.onPasswordCopy.bind(this);
        this.getPasswordHighlightClass = this.getPasswordHighlightClass.bind(this);
        this.getLinkButtonClass = this.getLinkButtonClass.bind(this);
        this.getPasswordButtonClass = this.getPasswordButtonClass.bind(this);
        this.state = {linkCopied: false, passwordCopied: false};
    }

    onLinkCopy() {
        this.setState({linkCopied: true});
    }

    getLinkHighlightClass() {
        return this.state.linkCopied ? 'success' : '';
    }

    onPasswordCopy() {
        this.setState({passwordCopied: true});
    }

    getPasswordHighlightClass() {
        return this.state.passwordCopied ? 'success' : '';
    }

    getLinkButtonClass() {
        return this.state.linkCopied ? 'btn-success' : 'btn-default';
    }

    getPasswordButtonClass() {
        return this.state.passwordCopied ? 'btn-success' : 'btn-default';
    }

    render() {
        const link = this.props.credentials.link;
        const password = this.props.credentials.password;
        const index = this.props.index;
        new Clipboard('.btn-copy');
        return (
            <tr>
                <td id={`link-${index}`} className={`column-join-right ${this.getLinkHighlightClass()}`}>{link}</td>
                <td className={`column-join-left ${this.getLinkHighlightClass()}`}>&nbsp;<button onClick={this.onLinkCopy} className={`btn btn-xs btn-copy ${this.getLinkButtonClass()}`} data-clipboard-target={`#link-${index}`}>Copy</button></td>
                <td id={`password-${index}`} className={`column-join-right ${this.getPasswordHighlightClass()}`}>{password}</td>
                <td className={`column-join-left ${this.getPasswordHighlightClass()}`}>&nbsp;<button onClick={this.onPasswordCopy} className={`btn btn-xs btn-copy ${this.getPasswordButtonClass()}`} data-clipboard-target={`#password-${index}`}>Copy</button></td>
            </tr>
        );
    }
}

class CredentialsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const credentials = [];

        this.props.credentials.forEach((credentialsInstance, index) => {
            credentials.push(<Credentials key={index} index={index} credentials={credentialsInstance}/>);
        });

        return (
            <div id="credentials-table" className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="column-join-right">Link</th>
                        <th className="column-join-left"/>
                        <th className="column-join-right">Password</th>
                        <th className="column-join-left"/>
                    </tr>
                    </thead>
                    <tbody>
                    {credentials}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CredentialsTable;