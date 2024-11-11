import {useState} from "react";

export function InputY(){
    const [selectedY, setSelectedY] = useState('0');
    const handleYChange = (event) => {
        setSelectedY(event.target.value);
    };
    return(
        <td>
            <input required name={selectedY} type="text" placeholder="(от -3 до 3)" maxLength="3" onChange={handleYChange}/>
        </td>
    )
}