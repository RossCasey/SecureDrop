import React, { Component } from 'react';

class BrowserSupport extends Component {
    render() {
        return (
            <div>
                <h3>Supported Browsers</h3>
                <p>Please use one of the browsers list below.</p>
                <div className="table-responsive">
                    <table className="table table-bordered align-center">
                        <thead>
                        <tr>
                            <th>Firefox</th>
                            <th>Chrome</th>
                            <th>Opera</th>
                            <th>Safari</th>
                            <th>Edge</th>
                            <th>Internet Explorer</th>
                            <th>Chrome for iOS</th>
                            <th>Safari for iOS</th>
                            <th>Firefox for iOS</th>
                            <th>Chrome for Android</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="success">34+</td>
                            <td className="success">41+</td>
                            <td className="success">28+</td>
                            <td className="danger">☓</td>
                            <td className="danger">☓</td>
                            <td className="danger">☓</td>
                            <td className="danger">☓</td>
                            <td className="danger">☓</td>
                            <td className="danger">☓</td>
                            <td className="success">58+</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BrowserSupport;