import Image from 'next/image'
import prisma from '@/prisma/client'

function getWeatherData() {
    const weatherData = prisma.city.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        }
    }).then((data) => {

        console.log(data)
    });


    console.log('here')
    console.log('Weather'+weatherData)
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
  return (
    <>
        { getWeatherData() }
        <div className="artboard artboard-horizontal phone-6 m-auto text-center">
            <h3 className="h3">Weather Leadership Board</h3>
            
        </div> 
    </>
  )
}
