import React, {useState} from "react";

export function InputR(){
    const [selectedR, setSelectedR] = useState('1');
    const handleRChange = (event) => {
        setSelectedR(event.target.value);
    };

    return (
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
    );
}