import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Body } from './components/Body';
import { Reg } from './components/Reg';
import './css/page.css';
import './css/reg.css';
import axios from 'axios';
import attention from "./images/reserve.mp3";

function App() {
    const url = 'http://192.168.0.223:8080/api/login';
    const [showReg, setShowReg] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterClick = () => {
        setShowReg(true);
    };
    const handleOutClick = () => {
        setShowReg(false);
    };
    const handleRegister = (event) => {
        console.log("Регистрация...");
        event.preventDefault();
        axios.get(url, {
            params: {
                username: username,
                password: password,
            }
        })
            .then(response => {
                console.log("Ответ от сервера (вход):", response.data);
                popupmessage(response.data, "green");
            })
            .catch(error => {
                console.error("Ошибка при входе:", error);
                popupmessage("Не получилось зарегистрироваться, скорее всего такой пользователь уже есть", "red");
            });
    };
    function popupmessage(message, color){
        const popup = document.getElementById('popup');
        popup.textContent = message;
        popup.style.display = 'block';
        popup.style.backgroundColor = color;
        if (color === "red") {
            let audioPlayer = document.getElementById('audioPlayer4');
            audioPlayer.play()
        }
        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    }
    const handleLogin = (event) => {
        console.log("Вход...");
        event.preventDefault();
        axios.get(url, {
            params: {
                username: username,
                password: password,
            }
        })
            .then(response => {
                console.log("Ответ от сервера (вход):", response.data);
                if (response.data === "уже регнут"){
                    popupmessage(response.data, "red");
                }else {
                    popupmessage(response.data, "green");
                    setShowReg(true);
                }

            })
            .catch(error => {
                console.error("Ошибка при входе:", error);
                popupmessage("Ошибка входа, возможно неверный логин или пароль", "red");
            });

    };

    return (
        <div className="App">
            <div id="popup" className="popup"></div>
            <Header/>
            {showReg ?
                <div><Body/>
                    <button className="logoutButton" onClick={handleOutClick}>Выйти</button>
                </div> :
                <div className="registration-container">
                    <h3 className="reg">Регистрация:</h3>
                    <form className="registration-form">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Обновляем состояние при изменении
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при изменении
                            />
                        </div>
                    </form>
                    <button className="submit" onSubmit={handleRegisterClick}
                            onClick={handleRegister}>Зарегистрироваться
                    </button>
                    <button className="submit" onSubmit={handleRegisterClick} onClick={handleLogin}>Войти</button>
                </div>
            }
            <audio id="audioPlayer4" src={attention} preload="auto"></audio>
            <Footer/>
        </div>
    );
}

export default App;
