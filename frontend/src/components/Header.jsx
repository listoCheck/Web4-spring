import React from 'react';
import '../css/Header.css';
import logoVT from '../images/logo.png';
export function Header(){
    return (
        <header>
            <div className="header-content">
                <img id="pic" src={logoVT} alt="pic"/>
                <div className="header-text">
                    <h1>Лабораторная работа по вебу №4</h1>
                    <h2>ААА</h2>
                    <h2>Группа P3206, Вариант №115228</h2>
                </div>
            </div>
        </header>
    )
}