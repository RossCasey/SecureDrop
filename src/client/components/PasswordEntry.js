import React, { Component } from 'react';

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
                <h3>Enter Password:</h3>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Password" onChange={this.onPasswordChange}/>
                    <button className="btn btn-primary btn-lg spacer">Decrypt</button>
                </div>
            </form>
        );
    }
}

export default PasswordEntry;