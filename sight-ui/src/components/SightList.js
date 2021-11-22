import React from 'react';
import Sight from './Sight';

function SightList({ sights }) {
    return (
        <table id="sights_table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {sights.map((sight, i) => <Sight sight={sight}

                    key={i} />)}
            </tbody>
        </table>
    );
}

export default SightList;
