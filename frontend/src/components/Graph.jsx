import React, { useState } from "react";
export function Graph() {
    const [pointer, setPointer] = useState({ cx: 200, cy: 200, visible: false });
    const handlePlotClick = (event) => {
        const svg = event.currentTarget;
        const rect = svg.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        //setSelectedX(clickX.toFixed(2));
        //setSelectedY(clickY.toFixed(2));
        setPointer({
            cx: clickX,
            cy: clickY,
            visible: true,
        });
    };

    return (
        <td rowSpan="6">
            <svg
                id="plot"
                xmlns="http://www.w3.org/2000/svg"
                width="400" height="400"
                onClick={handlePlotClick}
            >
                <line x1="0" y1="200" x2="400" y2="200" stroke="#000720"></line>
                <line x1="200" y1="0" x2="200" y2="400" stroke="#000720"></line>
                <line x1="350" y1="198" x2="350" y2="202" stroke="#000720"></line>
                <text x="355" y="195">R</text>
                <line x1="275" y1="198" x2="275" y2="202" stroke="#000720"></line>
                <text x="280" y="195">R/2</text>
                <line x1="125" y1="198" x2="125" y2="202" stroke="#000720"></line>
                <text x="123" y="195">-R/2</text>
                <line x1="50" y1="198" x2="50" y2="202" stroke="#000720"></line>
                <text x="55" y="195">-R</text>
                <line x1="198" y1="50" x2="202" y2="50" stroke="#000720"></line>
                <text x="204" y="55">R</text>
                <line x1="198" y1="125" x2="202" y2="125" stroke="#000720"></line>
                <text x="204" y="130">R/2</text>
                <line x1="198" y1="275" x2="202" y2="275" stroke="#000720"></line>
                <text x="204" y="280">-R/2</text>
                <line x1="198" y1="350" x2="202" y2="350" stroke="#000720"></line>
                <text x="204" y="355">-R</text>

                <polygon points="400,200 395,205 395, 195" fill="#000720" stroke="#101F27"></polygon>
                <polygon points="200,0 195,5 205,5" fill="#000720" stroke="#101F27"></polygon>

                <polygon points="200,200 350,200 200,125" fill-opacity="0.6" stroke="black" fill="red"></polygon>
                <rect x="50" y="50" width="150" height="150" fill-opacity="0.6" stroke="black" fill="red"></rect>
                <path d="M 200 200 L 50 200 C 50 300 125 350 200 350 Z" fill-opacity="0.6" stroke="black"
                      fill="red"></path>

                <circle
                    id="pointer"
                    r="8"
                    cx={pointer.cx}
                    cy={pointer.cy}
                    fill="black"
                    fill-opacity="0.7"
                    visibility={pointer.visible ? "visible" : "hidden"}  // Показываем/скрываем круг
                ></circle>
            </svg>
        </td>
    );
}
