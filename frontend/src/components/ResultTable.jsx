export function ResultTable({ results }) {
    let index = 1;
    return (
        <td colSpan="10">
            <h4>
                {results.length === 0 ? (
                    <span className="outputStub notification">Нет результатов</span>
                ) : null}

                <table className="history" id="outputContainer">
                    <thead>
                    <tr>
                        <th>Попытка:</th>
                        <th>X:</th>
                        <th>Y:</th>
                        <th>R:</th>
                        <th>Попадание:</th>
                        <th>Время:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((result) => (
                        <tr key={index}>
                            <td>{index++}</td>
                            <td>{result.x}</td>
                            <td>{result.y}</td>
                            <td>{result.r}</td>
                            <td>{result.hit ? 'Да' : 'Нет'}</td>
                            <td>{result.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </h4>
        </td>
    );
}
