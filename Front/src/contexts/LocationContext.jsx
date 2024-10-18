import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [currentLocation, setCurrentLocation] = useState('/');
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
        setCurrentLocation(location.pathname);
    }, [location]);

    return (
        <LocationContext.Provider value={{ currentLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocationContext() {
    return useContext(LocationContext);
}
