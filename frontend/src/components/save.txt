import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setX, setY, setR } from '../store/store';
import { ResultTable } from "./ResultTable";
import popal from '../images/krya.mp3';
import mimo from '../images/lego-breaking.mp3';
import attention from '../images/reserve.mp3';
import axios from "axios";

export function Body() {
    const dispatch = useDispatch();
    const selectedX = useSelector((state) => state.body.selectedX);
    const selectedY = useSelector((state) => state.body.selectedY);
    const selectedR = useSelector((state) => state.body.selectedR);

    const [pointer, setPointer] = useState({ cx: 200, cy: 200, visible: false, fill: "black"});
    const [results, setResults] = useState([]);

    const handleXChange = (event) => {
        dispatch(setX(event.target.value));
    };

    const handleYChange = (event) => {
        dispatch(setY(event.target.value));
    };

    const handleRChange = (event) => {
        dispatch(setR(event.target.value));
    };


    useEffect(() => {
        const calcX = 200 + (selectedX / selectedR) * 150;
        const calcY = 200 - (selectedY / selectedR) * 150;
        setPointer({
            cx: calcX,
            cy: calcY,
            visible: true,
            fill: "black"
        });
    }, [selectedX, selectedY, selectedR]);

    const handlePlotClick = (event) => {
        const svg = event.currentTarget;
        const rect = svg.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        dispatch(setX(((clickX - 200) / 150 * selectedR).toFixed(2)));
        dispatch(setY(((200 - clickY) / 150 * selectedR).toFixed(2)));
    };
    const sendData = (event) =>{
        console.log("отправка точки...");
        event.preventDefault();
        axios.get('http://localhost:8080/api/checkPoint', {
            params: {
                x: selectedX,
                y: selectedY,
                r: selectedR,
            }
        })
            .then(response => {
                console.log("Ответ от сервера (попадание):", response.data);
                let color = response.data ? "green" : "red";
                if (response.data){
                    let audioPlayer = document.getElementById('audioPlayer');
                    audioPlayer.play()
                    popupmessage("попал", "green");
                }else{
                    let audioPlayer = document.getElementById('audioPlayer2');
                    audioPlayer.play()
                    popupmessage("не попал" , "red");
                }
                const calcX = 200 + (selectedX / selectedR) * 150;
                const calcY = 200 - (selectedY / selectedR) * 150;
                setPointer({
                    cx: calcX,
                    cy: calcY,
                    visible: true,
                    fill: color,
                });
                setResults(prevResults => [
                    ...prevResults,
                    {
                        x: selectedX,
                        y: selectedY,
                        r: selectedR,
                        hit: response.data,
                        time: new Date().toLocaleTimeString(),
                    }
                ]);
            })
            .catch(error => {
                console.error("Ошибка: ", error);
                popupmessage("Ошибка: " + error, "red");
            });
    }
    function popupmessage(message, color){
        const popup = document.getElementById('popup');
        popup.textContent = message;
        popup.style.display = 'block';
        popup.style.backgroundColor = color;
        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    }
    return (
        <div>
            <div id="popup" className="popup"></div>
            <table id="mainTable">
                <thead>
                <tr>
                    <th>Валидация введённых значений:</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td colSpan="4">
                        <hr/>
                    </td>
                </tr>
                <tr>
                    <td>Выберите X:</td>
                    <td>
                        <select id="x-select" value={selectedX} onChange={handleXChange}>
                            <option value="-4">-4</option>
                            <option value="-3">-3</option>
                            <option value="-2">-2</option>
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <p>Выбранный X: {selectedX}</p>
                    </td>
                </tr>
                <tr>
                    <td>Введите Y:</td>
                    <td>
                        <input required name="Y" type="text" placeholder="(от -3 до 3)" maxLength="4" value={selectedY}
                               onChange={handleYChange}/>
                    </td>
                </tr>
                <tr>
                    <td>Выберите R:</td>
                    <td>
                        <select id="r-select" value={selectedR} onChange={handleRChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <p>Выбранный R: {selectedR}</p>
                    </td>
                    <td rowSpan="6">
                        <svg
                            id="plot"
                            xmlns="http://www.w3.org/2000/svg"
                            width="400" height="400"
                            onClick={handlePlotClick}
                        >
                            <line x1="0" y1="200" x2="200" y2="200" stroke="#000720"></line>
                            <line x1="200" y1="0" x2="200" y2="400" stroke="#000720"></line>
                            <line x1="350" y1="198" x2="350" y2="202" stroke="#000720"></line>
                            <text x="355" y="195">{selectedR}</text>
                            <line x1="275" y1="198" x2="275" y2="202" stroke="#000720"></line>
                            <text x="280" y="195">{selectedR / 2}</text>
                            <line x1="125" y1="198" x2="125" y2="202" stroke="#000720"></line>
                            <text x="123" y="195">-{selectedR / 2}</text>
                            <line x1="50" y1="198" x2="50" y2="202" stroke="#000720"></line>
                            <text x="55" y="195">-{selectedR}</text>
                            <line x1="198" y1="50" x2="202" y2="50" stroke="#000720"></line>
                            <text x="204" y="55">{selectedR}</text>
                            <line x1="198" y1="125" x2="202" y2="125" stroke="#000720"></line>
                            <text x="204" y="130">{selectedR / 2}</text>
                            <line x1="198" y1="275" x2="202" y2="275" stroke="#000720"></line>
                            <text x="204" y="280">-{selectedR / 2}</text>
                            <line x1="198" y1="350" x2="202" y2="350" stroke="#000720"></line>
                            <text x="204" y="355">-{selectedR}</text>

                            <polygon points="400,200 395,205 395, 195" fill="#000720" stroke="#101F27"></polygon>
                            <polygon points="200,0 195,5 205,5" fill="#000720" stroke="#101F27"></polygon>

                            <polygon points="200,200 350,200 200,125" fillOpacity="0.6" stroke="black"
                                     fill="red"></polygon>
                            <rect x="50" y="50" width="150" height="150" fillOpacity="0.6" stroke="black"
                                  fill="red"></rect>
                            <path d="M 200 200 L 50 200 C 50 300 125 350 200 350 Z" fillOpacity="0.6" stroke="black"
                                  fill="red"></path>

                            <circle
                                id="pointer"
                                r="8"
                                cx={pointer.cx}
                                cy={pointer.cy}
                                fill={pointer.fill}
                                fillOpacity="0.7"
                                visibility={pointer.visible ? "visible" : "hidden"}
                            ></circle>
                        </svg>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <button id="checkButton" onClick={sendData}>Проверить</button>
                        <audio id="audioPlayer" src={popal} preload="auto"></audio>
                        <audio id="audioPlayer2" src={mimo} preload="auto"></audio>
                        <audio id="audioPlayer4" src={attention} preload="auto"></audio>
                    </td>
                </tr>
                <tr>
                    <td colSpan="15">
                        <hr/>
                    </td>
                </tr>
                </tbody>

                <tfoot>
                <tr>
                    <ResultTable results={results}/>
                </tr>
                </tfoot>
            </table>
        </div>
    );
}