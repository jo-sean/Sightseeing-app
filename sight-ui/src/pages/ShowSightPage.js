import React from 'react';
import SightList from '../components/SightList';
import { Link } from 'react-router-dom';
import scene from './media/mt_hood.jpg';


class ShowSightPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 97001,
            sights: [],
            weather: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchSights = this.searchSights.bind(this);
    }

    handleChange = event => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({ value: event.target.value });
    };

    searchSights = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8222/sight-ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ zipCode: this.state.value })
        });
        response.json().then(result => { this.setState({ sights: result }) }).catch(error => { alert(error) });
    };

    searchWeather = async (event) => {
        event.preventDefault();
        const weather = await fetch('http://localhost:3030/current-weather/zip-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ zipCode: this.state.value })
        });
        weather.json().then(weather_json => { this.setState({ weather: weather_json }) }).catch(error => { alert(error) });
    };

    render() {
        return (
            <>
                <img src={scene} alt="sunset" class='responsive'></img>
                <h2>Sightseeing Results in that area</h2>

                <br></br>
                <br></br>

                <section className='goHome'>
                    Want to see the directions of how to use it again?
                    <button className='newSearch'><Link to="/" className='homeAnchor'>Home</Link></button>
                </section>

                <br></br>

                <section className='weather'>
                    Weather: {this.state.weather.weather}
                </section>

                <br></br>
                <br></br>

                <SightList sights={this.state.sights}></SightList>

                <br></br>

                <form >
                    <label className='zip' for="zip">Enter 5-digit zip code from Oregon</label>
                    <input
                        type="number"
                        name="value"
                        id="zip"
                        maxLength="5"
                        minLength="5"
                        min="97001"
                        value={this.state.value}
                        onChange={this.handleChange}
                        max="97920"
                        placeholder='97XXX'
                        className='button'
                        required>
                    </input>
                    <button className='button' onClick={this.searchSights} onMouseUp={this.searchWeather} id='search'>Search</button>
                </form>

                <br></br>
                <br></br>
            </>
        );
    }
}

export default ShowSightPage;
