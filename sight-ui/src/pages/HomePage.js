import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import banner from './media/columbia_rv.jpg'

function HomePage() {

    const state = { value: 0 };

    const handleChange = event => {

        let { value, min, max } = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        this.setState({ value });
    };

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
    // }


    return (
        <>
            {/* <h2>Oregon Sightseeing App</h2> */}

            <img src={banner} alt="Banner" class='responsive'></img>

            <br></br>

            <p class="Intro"> Welcome! This app provides you a list of sightseeing places close to you. To use it,
                just put the 5-digit postal code in the search bar below and click the "Search" button'. </p>

            <br></br>

            <form action="/add-sight">
                {/* <div> */}
                <label for="zip">Enter 5-digit zip code from Oregon</label>
                <input
                    type="number"
                    name="name"
                    id="zip"
                    maxLength="5"
                    minLength="5"
                    min="97001"
                    // value={this.state.value}
                    // onChange={this.handleChange}
                    max="97920"
                    placeholder='97XXX'
                    className='Button'
                    required>

                </input>
                <button className='Button'><Link to="/show-sights" className=' Anchor'>Search</Link></button>
                {/* </div> */}
            </form>
            <br></br>
            <br></br>

        </>

    );
}

export default HomePage;