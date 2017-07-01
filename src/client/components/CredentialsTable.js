import React, { Component } from 'react';
import '../public/css/CredentialsTable.css';
import Clipboard from 'clipboard';

class Credentials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const link = this.props.credentials.link;
        const password = this.props.credentials.password;
        const index = this.props.index;
        new Clipboard('.btn-copy');
        return (
            <tr>
                <td id={`link-${index}`} className="column-join-right">{link}</td>
                <td className="column-join-left"><button className="btn btn-default btn-xs btn-copy" data-clipboard-target={`#link-${index}`}>Copy</button></td>
                <td id={`password-${index}`} className="column-join-right">{password}</td>
                <td className="column-join-left"><button className="btn btn-default btn-xs btn-copy" data-clipboard-target={`#password-${index}`}>Copy</button></td>
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