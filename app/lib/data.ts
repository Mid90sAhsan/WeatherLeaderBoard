import React from 'react'
import prisma from '@/prisma/client'

export async function getCitiesWeather (): Promise<any> {

    try {
        const cities = await prisma.city.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        });
    
        console.log("here")
        console.log(cities)
    
        return cities
    } catch(e) {
        console.log(e)
    }
   
}



const data = () => {
    
}

export default data