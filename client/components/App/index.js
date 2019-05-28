import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';

import Layout from '../Layout';
import ThingsList from '../ThingsList';
import Auth from '../Auth';
import List from '../List';

import api from '../../api'
import * as cookie from '../../cookie'

function validate(string) {
    if (string.length > 4) return true;
    return false;
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: cookie.get('theme') ? cookie.get('theme') : 'light',
            userId: cookie.get('userId'),
            userName: ''
        };
        this.themeСhange = this.themeСhange.bind(this);
        this.logIn = this.logIn.bind(this);
        this.toRegister = this.toRegister.bind(this);
        this.toOut = this.toOut.bind(this);
        document.querySelector('body').classList.add(this.state.theme);
        this.token = cookie.get('token') ? cookie.get('token') : Math.random().toString(36).substr(2);
        cookie.set('token', this.token);
        cookie.set('theme', this.state.theme);
    }

    themeСhange() {
        if (this.state.theme === 'dark') {
            document.querySelector('body').classList.remove('dark');
            document.querySelector('body').classList.add('light');
            this.setState({
                theme: 'light',
            });
            cookie.set('theme', 'light');
        }
        else {
            document.querySelector('body').classList.remove('light');
            document.querySelector('body').classList.add('dark');
            this.setState({
                theme: 'dark',
            });
            cookie.set('theme', 'dark');
        }
    }


    logIn() {
        let login = document.querySelector('.login').value;
        let pass = document.querySelector('.password').value;
        if (validate(login) && validate(pass)) {
            api.logIn(login, pass)
                .then(data => {
                    cookie.set('userId', data.userId);
                    this.setState({
                        userId: data.userId,
                        userName: login
                    });
                })
                .catch(e => {
                    if (e.message === 'Unauthorized') alert('Неверный пароль');
                    if (e.message === 'Not Found') alert('Пользователь не найден');
                    else alert(e.message);
                });
        }
        else alert('Логин и пароль должны содержать больше 7 символов');
    }

    toRegister() {
        let login = document.querySelector('.login').value;
        let pass = document.querySelector('.password').value;
        if (validate(login) && validate(pass)) {
            api.toRegister(login, pass)
                .then(data => {
                    cookie.set('userId', data.userId);
                    this.setState({
                        userId: data.userId,
                        userName: login
                    });
                })
                .catch(e => {
                    if (e.message === 'Unauthorized') alert('Пользователь с таким логином уже существует');
                    else alert(e.message);
                });
        }
        else alert('Логин и пароль должны содержать больше 7 символов');
    }

    toOut() {
        cookie.set('userId', '');
        this.setState({
            userId: '',
            userName: ''
        });
    }

    componentWillMount() {
        if (this.state.userId) {
            api.getName(this.state.userId)
                .then(data => {
                    this.setState({
                        userName: data.userName
                    });
                });
        }
    }

    render() {
        return (
            <div>
                <Layout themeСhange={this.themeСhange} theme={this.state.theme} userId={this.state.userId} toOut={this.toOut} userName={this.state.userName}>
                    {this.state.userId && <Route exact path='/' render={() => <ThingsList theme={this.state.theme} token={this.token} userId={this.state.userId} />} />}
                    {!this.state.userId && <Route exact path='/' render={() => <Auth theme={this.state.theme} logIn={this.logIn} toRegister={this.toRegister} />} />}
                    <Route exact path='/:userId' component={List} />
                </Layout>
            </div>
        );
    }
}