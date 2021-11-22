import React from 'react';

function Sight({ sight }) {
    return (
        <tr>
            <td>{sight.name}</td>
            <td>{sight.latitude} </td>
            <td>{sight.longitude} </td>
        </tr>
    );
}

export default Sight;