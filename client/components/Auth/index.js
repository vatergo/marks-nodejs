import React from 'react';
import './index.css';

export default class Auth extends React.Component {
    render() {
        return (
            <div className={"content content-" + this.props.theme}>
                <div className="container">
                    <div className="auth-form">
                        <h2 className="auth-caption">Авторизация</h2>
                        <input type="login" className="textfield login" placeholder="Имя пользователя" />
                        <input type="password" className="textfield password" placeholder="Пароль" />
                        <div className="buttons">
                            <button type='submit' className="button login" onClick={this.props.logIn}>Войти</button>
                            <button type='button' className="button signup" onClick={this.props.toRegister}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}