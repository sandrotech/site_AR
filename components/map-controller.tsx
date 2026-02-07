"use client"

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

interface MapControllerProps {
    userLocation: { lat: number; lng: number } | null
}

export function MapController({ userLocation }: MapControllerProps) {
    const map = useMap()

    useEffect(() => {
        if (userLocation) {
            map.flyTo([userLocation.lat, userLocation.lng], 13, {
                duration: 1.5
            })
        }
    }, [userLocation, map])

    return null
}
