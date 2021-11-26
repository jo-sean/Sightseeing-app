import React from 'react';
import { Link } from 'react-router-dom';
import banner from './media/columbia_rv.jpg';

class HomePage extends React.Component {

    render() {
        return (
            <>
                <img src={banner} alt="Banner" class='responsive'></img>

                <p class="intro"> Welcome! This app provides you a list of sightseeing places close to you. To use it,
                    click the "Get Started" button below and on the following page put the 5-digit Oregon postal code in the
                    search bar and click the "Search" button'. If you want to do a new zip code, just change it and click "Search"
                    again. <span className='warning'> If nothing happens, that means that the postal code entered is not valid. </span> Happy searching!  </p>

                <button className='button'><Link to="/show-sights" className='anchor'>Get Started</Link></button>

                <br></br>
                <br></br>
            </>

        );
    }

}

export default HomePage;

