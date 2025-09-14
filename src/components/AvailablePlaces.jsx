import Places from './Places.jsx';
import {useEffect, useState} from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({onSelectPlace}) {

    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchPlaces = async() => {
            try {
                setLoading(true)
                const places = await fetchAvailablePlaces();

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setAvailablePlaces(places);
                    setLoading(false);
                })

            } catch (error) {
                setError({message: error.message || "Could not fetch places, please try again later."})
                setLoading(false)
            }

        }
        fetchPlaces()
    },[]);

    if (error) {
        console.log(error)
        return <ErrorPage title="An error occurred" message={error.message}/>;
    }

    // useEffect(() => {
    //     const fetchPlaces = async() => {
    //         setLoading(true)
    //         try {
    //             const response = await axios.get('http://localhost:4000/places');
    //
    //             navigator.geolocation.getCurrentPosition((position) => {
    //                 const sortedPlaces = sortPlacesByDistance(
    //                     response.data.places,
    //                     position.coords.latitude,
    //                     position.coords.longitude
    //                 )
    //                 setAvailablePlaces(response.data.places);
    //                 setLoading(false);
    //             })
    //
    //
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     }
    //     fetchPlaces()
    // }, []);


    if (error) {
        return <ErrorPage title={error.response.statusText} message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={loading}
            loadingText="Loading..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
