import React from 'react';
import './index.css';

export default class Toggle extends React.Component {
    render() {
        return (
            <div className="toggle">
                <label className="switch">
                    {this.props.theme === 'dark' ? <input type="checkbox" defaultChecked /> : <input type="checkbox" />}
                    <div className="slider round" onClick={this.props.themeСhange}></div>
                </label>
            </div>
        );
    }
}