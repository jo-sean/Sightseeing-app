import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import SightList from '../components/SightList';
import { Link } from 'react-router-dom';


export const CreateSightPage = ({ setSightToEdit }) => {

    const [name, setName] = useState('');
    const [location, setReps] = useState('');
    const [weather, setWeight] = useState('');
    const [crimeRate, setUnit] = useState('');

    const [sights, setSights] = useState([]);
    const history = useHistory();

    // const onDelete = async _id => {
    //     const response = await fetch(`/sights/${_id}`, { method: 'DELETE' });
    //     if (response.status === 204) {
    //         setSights(sights.filter(e => e._id !== _id));
    //     } else {
    //         console.error(`Failed to delete sight with _id = ${_id}, status code = ${response.status}`);
    //     }
    // };

    // const onEdit = sight => {
    //     setSightToEdit(sight);
    //     history.push("/edit-sight");
    // };

    const loadSights = async () => {
        const response = await fetch('/sights');
        const data = await response.json();
        setSights(data);
    };

    useEffect(() => {
        loadSights();
    }, []);



    const addSight = async () => {
        const newSight = { name, location, weather, crimeRate };
        const response = await fetch('/sights', {
            method: 'POST',
            body: JSON.stringify(newSight),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the sightseeing location");
        } else {
            alert(`Failed to add sight, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h2>Sightseeing Results in that area</h2>

            <SightList sights={sights}></SightList>


            <br></br>
            <br></br>
            <section>
                Want to try a different Oregon zip code?
                <button className='NewSearch'><Link to="/" className='homeAnchor'>New Search</Link></button>
            </section>
        </div>
    );
}

export default CreateSightPage;






{/* <input
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                value={location}
                required
                // min='0'
                placeholder="Location"
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                placeholder="Weather"
                value={weather}
                required
                // min='0'
                // max="999"
                // maxlength="3"
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                value={crimeRate}
                required
                // maxlength="3"
                placeholder="Crime Rate"
                onChange={e => setUnit(e.target.value)} />

            <button
                onClick={addSight}
            >Add</button> */}