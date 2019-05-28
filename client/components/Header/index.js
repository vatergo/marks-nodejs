import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';

import Toggle from '../Toggle';

export default class Header extends React.Component {
    render() {
        return (
            <div className={'header header-' + this.props.theme}>
                <div className="container">
                    <Link className="logo" to="/">Marks</Link>
                    <Toggle themeСhange={this.props.themeСhange} theme={this.props.theme} />
                    {this.props.userId && <Link className="link exit" to="/" onClick={this.props.toOut} 
                    onMouseOver={() => document.querySelector('.exit').innerHTML='Выход'}
                    onMouseOut={() => document.querySelector('.exit').innerHTML=this.props.userName}>{this.props.userName}</Link>}
                </div>
            </div>
        )
    }
}