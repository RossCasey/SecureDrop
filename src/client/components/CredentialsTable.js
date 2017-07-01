import React, { Component } from 'react';
import Clipboard from 'clipboard';

class Credentials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const link = this.props.credentials.link;
        const password = this.props.credentials.password;
        const index = this.props.index;
        new Clipboard('.copyButton');
        return (
            <tr>
                <td id={`link-${index}`}>{link}<button className="btn btn-default btn-xs copyButton" data-clipboard-target={`#link-${index}`}>Copy</button></td>
                <td id={`password-${index}`}>{password}<button className="btn btn-default btn-xs copyButton" data-clipboard-target={`#password-${index}`}>Copy</button></td>
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
            <div id="credentialsTable" className="table-responsive">
                <table className="table table-bordered table-hover">
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
            </div>
        );
    }
}

export default CredentialsTable;