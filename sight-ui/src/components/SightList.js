import React from 'react';
import Sight from './Sight';

function SightList({ sights, onDelete, onEdit }) {
    return (
        <table id="sights_table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Weather</th>
                    <th>Crime Rate</th>
                    {/* <th>Edit</th>
                    <th>Delete</th> */}
                </tr>
            </thead>
            <tbody>
                {sights.map((sight, i) => <Sight sight={sight}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default SightList;
