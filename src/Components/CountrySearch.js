import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const CountrySearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [countryInfo, setCountryInfo] = useState(null);
    const [error, setError] = useState("");

    const fetchCountryInfo = async (country) => {
        try {
            setError(""); // Clear any previous errors
            const response = await axios.get(
                `https://en.wikipedia.org/w/api.php`,
                {
                    params: {
                        action: "query",
                        format: "json",
                        prop: "extracts|info",
                        titles: country,
                        exintro: true,
                        explaintext: true,
                        origin: "*", // Allow CORS requests
                    },
                }
            );

            const pages = response.data.query.pages;
            const pageKey = Object.keys(pages)[0];

            if (pageKey === "-1") {
                setError("No data found for this country.");
                setCountryInfo(null);
            } else {
                setCountryInfo(pages[pageKey].extract); // Save the extracted info
            }
        } catch (error) {
            setError("Failed to fetch country data. Please try again.");
            setCountryInfo(null);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            fetchCountryInfo(searchQuery);
        }
    };

    return (
        <div className="country-search">
          <Helmet>
            <title>World Data - Country Search!</title>
            <meta name="description" content="Welcome to the World Data Country Search!" />
            <meta property="og:title" content="World Data - Country Search!" />
            <meta property="og:description" content="Search any country and get it's history and statistics!" />
          </Helmet>
            <h6>Search for Country Information</h6>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter country name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">
                    Search
                </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {countryInfo && (
                <div className="mt-3">
                    <h5>Country Info:</h5>
                    <p>{countryInfo}</p>
                </div>
            )}
        </div>
    );
};

export default CountrySearch;
