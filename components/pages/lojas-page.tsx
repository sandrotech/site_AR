"use client"

import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { MapPin, Phone, Clock, Search, Locate, Loader2, Check, Navigation, X, ExternalLink, Map, List } from "lucide-react"
import { useState, useEffect, useMemo, useRef } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Map as LeafletMap } from 'leaflet'

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Store data with coordinates
const stores = [
  {
    id: 1,
    name: "Loja Bom Jardim",
    address: "R. Maria Júlia, 980 - Bom Jardim, Fortaleza - CE, 60540-250",
    phone: "(85) 9 9996.0267",
    hours: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
    lat: -3.7881,
    lng: -38.5434,
    mapUrl: "https://maps.google.com/?q=R.+Maria+Júlia,+980+-+Bom+Jardim,+Fortaleza+-+CE",
    image: "/loja/loja_bom jardim.png",
    status: "Aberto",
    description: "Nossa primeira loja, inaugurada em 1997. Localizada no coração do Bom Jardim."
  },
  {
    id: 2,
    name: "Loja Bonsucesso",
    address: "R. Verbena, 630 - Bonsucesso, Fortaleza - CE, 60545-350",
    phone: "(85) 9 9660.2873",
    hours: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
    lat: -3.7925,
    lng: -38.5512,
    mapUrl: "https://maps.google.com/?q=R.+Verbena,+630+-+Bonsucesso,+Fortaleza+-+CE",
    image: "/loja/loja_bonsucesso.jpg",
    status: "Aberto",
    description: "Nossa segunda unidade, expandindo nosso atendimento para mais famílias."
  },
]

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function LojasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [distances, setDistances] = useState<Record<number, number>>({})
  const [customIcon, setCustomIcon] = useState<any>(null)
  const [showStoreDetail, setShowStoreDetail] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const mapRef = useRef<LeafletMap | null>(null)

  // Initialize custom marker icon
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        const icon = L.default.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
        setCustomIcon(icon)
      })
    }
  }, [])

  // Request user location
  const requestLocation = () => {
    setLocationStatus('loading')

    if (!navigator.geolocation) {
      setLocationStatus('error')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        setUserLocation({ lat: userLat, lng: userLng })
        setLocationStatus('success')

        // Calculate distances to all stores
        const calculatedDistances: Record<number, number> = {}
        stores.forEach(store => {
          const distance = calculateDistance(userLat, userLng, store.lat, store.lng)
          calculatedDistances[store.id] = distance
        })
        setDistances(calculatedDistances)

        // Fly to user location
        if (mapRef.current) {
          mapRef.current.flyTo([userLat, userLng], 13, {
            duration: 1.5
          })
        }
      },
      (error) => {
        console.error('Location error:', error)
        setLocationStatus('error')
      }
    )
  }

  // Handle store selection - fly to store on map
  const handleStoreClick = (store: typeof stores[0]) => {
    setSelectedStore(store)
    setShowStoreDetail(true)

    // Fly to store location on map
    if (mapRef.current) {
      mapRef.current.flyTo([store.lat, store.lng], 16, {
        duration: 1.5
      })
    }

    // Switch to map view on mobile
    if (window.innerWidth < 1024) {
      setMobileView('map')
      setBottomSheetOpen(true)
    }
  }

  // Filter stores based on search
  const filteredStores = useMemo(() => {
    if (!searchQuery) return stores
    const query = searchQuery.toLowerCase()
    return stores.filter(store =>
      store.name.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Default center (Fortaleza)
  const mapCenter: [number, number] = [-3.7900, -38.5470]

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile View Toggle - Only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex">
          <button
            onClick={() => setMobileView('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all ${mobileView === 'list'
              ? 'text-primary border-b-4 border-primary bg-blue-50'
              : 'text-gray-500 hover:bg-gray-50'
              }`}
          >
            <List className="h-5 w-5" />
            Lojas
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all ${mobileView === 'map'
              ? 'text-primary border-b-4 border-primary bg-blue-50'
              : 'text-gray-500 hover:bg-gray-50'
              }`}
          >
            <Map className="h-5 w-5" />
            Mapa
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-screen pt-[73px] lg:pt-0">
        {/* Left Sidebar - Store List */}
        <div className={`w-full lg:w-[400px] bg-white border-r border-gray-200 flex flex-col relative z-10 ${mobileView === 'list' ? 'block' : 'hidden lg:flex'
          }`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-black text-primary mb-4">Nossas Lojas</h1>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por bairro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base border-gray-300 focus:border-primary focus:ring-primary rounded-lg"
              />
            </div>

            {/* Location Button */}
            <Button
              onClick={requestLocation}
              disabled={locationStatus === 'loading'}
              className="w-full mt-4 bg-primary hover:bg-blue-800 text-white font-bold py-6 rounded-lg gap-2 transition-all"
            >
              {locationStatus === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Detectando...
                </>
              ) : locationStatus === 'success' ? (
                <>
                  <Check className="h-5 w-5" />
                  Localização detectada
                </>
              ) : (
                <>
                  <Locate className="h-5 w-5" />
                  Usar minha localização
                </>
              )}
            </Button>
          </div>

          {/* Store List */}
          <div className="flex-1 overflow-y-auto">
            {filteredStores.map((store) => {
              const distance = distances[store.id]
              const isSelected = selectedStore?.id === store.id

              return (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                  onClick={() => handleStoreClick(store)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-l-4 border-l-primary shadow-lg' : ''
                    }`}
                >
                  {/* Store Image */}
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden group">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Store Name */}
                      <h3 className="font-bold text-gray-900 mb-1 truncate">
                        {store.name}
                      </h3>

                      {/* Address */}
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {store.address}
                      </p>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs font-medium text-green-700">
                            {store.status}
                          </span>
                        </div>

                        {distance && (
                          <span className="text-xs text-gray-500">
                            • {distance.toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className={`flex-1 relative ${mobileView === 'map' ? 'block' : 'hidden lg:block'
          }`}>
          {customIcon && (
            <MapContainer
              center={mapCenter}
              zoom={12}
              scrollWheelZoom={true}
              className="h-full w-full"
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredStores.map((store) => (
                <Marker
                  key={store.id}
                  position={[store.lat, store.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => handleStoreClick(store)
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-primary mb-2">{store.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{store.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          <a href={`tel:${store.phone.replace(/\D/g, '')}`} className="text-primary hover:underline">
                            {store.phone}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{store.hours}</span>
                        </div>
                      </div>
                      <a
                        href={store.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-3 text-center bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        Como chegar
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          {/* Floating Location Button - Mobile */}
          <div className="lg:hidden absolute bottom-6 right-6 z-[1000]">
            <Button
              onClick={requestLocation}
              disabled={locationStatus === 'loading'}
              className="bg-primary hover:bg-blue-800 text-white font-bold p-4 rounded-full shadow-2xl"
            >
              {locationStatus === 'loading' ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Locate className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Mobile Store Detail */}
      <AnimatePresence>
        {bottomSheetOpen && selectedStore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBottomSheetOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info: PanInfo) => {
                if (info.offset.y > 100) {
                  setBottomSheetOpen(false)
                }
              }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-24px)] pb-6">
                {/* Store Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={selectedStore.image}
                    alt={selectedStore.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Store Name */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h2 className="text-2xl font-black text-white mb-1">
                      {selectedStore.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-white font-bold text-sm">{selectedStore.status}</span>
                      {distances[selectedStore.id] && (
                        <span className="text-white/80 text-sm">
                          • {distances[selectedStore.id].toFixed(1)} km
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="px-6 pt-4 space-y-4">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {selectedStore.description}
                  </p>

                  {/* Contact Cards */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-0.5">Endereço</h4>
                        <p className="text-gray-700 text-sm">{selectedStore.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-0.5">Telefone</h4>
                        <a
                          href={`tel:${selectedStore.phone.replace(/\D/g, '')}`}
                          className="text-primary hover:underline font-medium text-sm"
                        >
                          {selectedStore.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-0.5">Horário</h4>
                        <p className="text-gray-700 text-sm">{selectedStore.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      asChild
                      className="flex-1 bg-primary hover:bg-blue-800 text-white font-bold py-6 rounded-xl gap-2 group"
                    >
                      <a href={selectedStore.mapUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-5 w-5 group-hover:rotate-45 transition-transform" />
                        Rotas
                      </a>
                    </Button>

                    <Button
                      asChild
                      className="flex-1 bg-secondary hover:bg-orange-600 text-white font-bold py-6 rounded-xl gap-2"
                    >
                      <a href={`tel:${selectedStore.phone.replace(/\D/g, '')}`}>
                        <Phone className="h-5 w-5" />
                        Ligar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Modal - Same as before */}
      <AnimatePresence>
        {showStoreDetail && selectedStore && !bottomSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoreDetail(false)}
              className="hidden lg:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="hidden lg:block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Store Image Header */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedStore.image}
                  alt={selectedStore.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setShowStoreDetail(false)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Store Name Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                    {selectedStore.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-bold">{selectedStore.status}</span>
                    {distances[selectedStore.id] && (
                      <span className="text-white/80">
                        • {distances[selectedStore.id].toFixed(1)} km de você
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Store Info */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedStore.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">Endereço</h4>
                      <p className="text-gray-700">{selectedStore.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">Telefone</h4>
                      <a
                        href={`tel:${selectedStore.phone.replace(/\D/g, '')}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {selectedStore.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">Horário de Funcionamento</h4>
                      <p className="text-gray-700">{selectedStore.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="flex-1 bg-primary hover:bg-blue-800 text-white font-bold py-6 rounded-xl gap-2 group"
                  >
                    <a href={selectedStore.mapUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-5 w-5 group-hover:rotate-45 transition-transform" />
                      Como chegar
                    </a>
                  </Button>

                  <Button
                    asChild
                    className="flex-1 bg-secondary hover:bg-orange-600 text-white font-bold py-6 rounded-xl gap-2"
                  >
                    <a href={`tel:${selectedStore.phone.replace(/\D/g, '')}`}>
                      <Phone className="h-5 w-5" />
                      Ligar agora
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
