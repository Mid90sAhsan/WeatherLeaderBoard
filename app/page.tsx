import Image from 'next/image'
import prisma from '@/prisma/client'
import { getCitiesWeather } from './lib/data'
import { useEffect, useState } from 'react';
import { getStaticProps } from 'next/dist/build/templates/pages';

type weatherData = {
    name: string,
    lon: number,
    lat: number,
    temp: number,
    createdAt: Date,
    updatedAt: Date
}

var weatherData: weatherData[] = [];

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

async function getWeatherData() {
    weatherData = await prisma.city.findMany({});
    console.log( 'Getting city ' + weatherData );
      
    //    await fetch("https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&current=temperature_2m")
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    var data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&current=temperature_2m');
    console.log( 'data ' + data.json() );

    // weatherData.forEach(async (city, index) => {
    //     console.log( city.name );
        
    // });
   
}

getWeatherData(); 

export default function Home( ) {

  return (
    <>
        <div className="artboard artboard-horizontal phone-6 m-auto text-center">
            <h3 className="h3">Weather Leadership Board</h3>
             
            {weatherData.length > 0 ? (
                weatherData.map((city, index) => ( 
                    // Your JSX here
                    <div className="card" key={index}>
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
 