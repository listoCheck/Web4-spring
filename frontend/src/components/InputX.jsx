import React, { useState } from 'react';
export function InputX(){
    const [selectedX, setSelectedX] = useState('-4');
    const handleXChange = (event) => {
        setSelectedX(event.target.value);
    };
    return (
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
    );
}