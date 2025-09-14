export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:4000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(`Could not fetch available places`);
    }

    return resData.places;
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:4000/user-places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(`Could not fetch user places`);
    }

    return resData.places;
}

export default async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:4000/user-places', {
        method: "PUT",
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if(!response.ok){
        throw new Error(`Could not update user data`);
    }

    return resData.message;
}



