import React, { Component } from 'react';

class Credentials extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const link = this.props.credentials.link;
        const password = this.props.credentials.password;
        const index = this.props.index;
        return (
            <tr>
                <td id={`link-${index}`}>{link}</td>
                <td id={`password-${index}`}>{password}</td>
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