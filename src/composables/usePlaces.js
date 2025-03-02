export async function usePlaces(value) {
    let results = []

    try {

        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary("places");

        let center = new google.maps.LatLng(59.334591, 18.063240);

        const request = {
            fields: ["displayName", "location", "rating", "priceLevel", "allowsDogs", "servesBeer", "servesCocktails", "servesWine"],
            locationRestriction: {
                center: center,
                radius: 5000,
            },
            includedPrimaryTypes: [value],
            maxResultCount: 20,
            rankPreference: SearchNearbyRankPreference.POPULARITY,
            language: "en-US",
            region: "se",
        };

        const { places } = await Place.searchNearby(request);
        const parsedPlaces = places.map((place) => {
            return place.Eg;
        })
        // parsedPlaces.sort((a, b) => b.rating - a.rating);
        results = parsedPlaces;
        return results;

    } catch (error) {
        throw new Error("Error fetching data, please try again: ", error);
    }
}