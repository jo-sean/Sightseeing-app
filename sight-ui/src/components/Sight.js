import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Sight({ sight, onDelete, onEdit }) {
    return (
        <tr>
            <td>{sight.name}</td>
            <td>{sight.location}</td>
            <td>{sight.weather}</td>
            <td>{sight.crimeRate}</td>
            {/* <td><MdEdit onClick={() => onEdit(sight)} /></td>
            <td><MdDeleteForever onClick={() => onDelete(sight._id)} /></td> */}
        </tr>
    );
}

export default Sight;