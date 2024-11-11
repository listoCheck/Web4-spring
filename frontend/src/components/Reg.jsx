import React from 'react';
import '../css/reg.css';

export function Reg() {
    return (
        <div>
            <h2 className="reg">Регистрация:</h2>
            <form className="registration-form">
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" name="password" />
                </div>
            </form>
        </div>
    );
}
