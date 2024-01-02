'use client'

import Image from 'next/image'
import prisma from '@/prisma/client'
import { getCitiesWeather } from './lib/data'
import { useEffect, useState } from 'react';

type weatherData = {
    name: string,
    lon: number,
    lat: number,
    temp: number,
    createdAt: Date,
    updatedAt: Date
}



function insertWeatherData() {
    const weatherData = prisma.city.create({
        data: {
            name: 'New York',
            lon: 10,
            lat: 10,
            temp: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }).then((data) => {
        console.log(data)
    });
}

export default function Home( ) {

    const [ weatherData: weatherData[], setWeatherData ] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await getCitiesWeather();
                setWeatherData(data);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };

        fetchWeatherData(); 
    }, []);

  return (
    <>
        <div className="artboard artboard-horizontal phone-6 m-auto text-center">
            <h3 className="h3">Weather Leadership Board</h3>
            
            {weatherData.length > 0 ? (
                weatherData.map((city) => (
                    // Your JSX here
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{city.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Temp: {city.temp}</h6>
                            <p className="card-text">Lat: {city.lat}</p>
                            <p className="card-text">Lon: {city.lon}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}

        </div> 
    </>
  )
}
