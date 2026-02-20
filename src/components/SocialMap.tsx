'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl, Popup, Layer } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Users, Compass, Navigation } from 'lucide-react';
import { mockStudents, StudentLocation } from '@/lib/mockStudents';
import Image from 'next/image';

export default function SocialMap({ className }: { className?: string }) {
    const [selectedStudent, setSelectedStudent] = useState<StudentLocation | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [isIdle, setIsIdle] = useState(true);
    const animationRef = useRef<number | null>(null);

    // Starting viewport centered on Kuala Lumpur
    const [viewState, setViewState] = useState({
        longitude: 101.6869,
        latitude: 3.1390,
        zoom: 14.5, // Closer zoom to see buildings
        pitch: 60, // Deep angle for 3D effect
        bearing: -17.6
    });

    // Cinematic Idle Spin Animation
    const rotateCamera = useCallback((timestamp: number) => {
        if (!isIdle) return;
        setViewState((prev) => ({
            ...prev,
            bearing: prev.bearing + 0.1 // Spin speed
        }));
        animationRef.current = requestAnimationFrame(rotateCamera);
    }, [isIdle]);

    useEffect(() => {
        if (isIdle) {
            animationRef.current = requestAnimationFrame(rotateCamera);
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isIdle, rotateCamera]);

    // Handle "Check In" simulation
    const handleCheckIn = () => {
        setIsIdle(false);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
                setViewState({
                    ...viewState,
                    longitude,
                    latitude,
                    zoom: 15.5,
                    pitch: 65,
                    bearing: 0
                });
            }, (error) => {
                console.error("Error getting location: ", error);
                // Fallback to KL center if user denies permission for demo
                setUserLocation([101.6869, 3.1390]);
            });
        } else {
            setUserLocation([101.6869, 3.1390]);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'studying': return 'bg-blue-500';
            case 'chilling': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'online': return 'Online';
            case 'studying': return 'At Library / Class';
            case 'chilling': return 'Hanging out';
            default: return 'Offline';
        }
    };

    return (
        <div className={`relative bg-slate-900 border-y border-white/10 ${className || 'w-full h-[calc(100vh-80px)] mt-20'}`}
            onMouseEnter={() => setIsIdle(false)}
            onMouseLeave={() => setIsIdle(true)}
            onTouchStart={() => setIsIdle(false)}>

            {/* MAPLIBRE TILE SERVER - using Carto Dark Matter free tiles for a premium look */}
            <Map
                {...viewState}
                onMove={(evt: any) => setViewState(evt.viewState)}
                mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                mapLib={maplibregl}
                attributionControl={false}
                dragRotate={true}
                pitchWithRotate={true}
                maxPitch={85}
            >
                {/* 3D BUILDINGS LAYER */}
                <Layer
                    id="3d-buildings"
                    source="carto"
                    source-layer="building"
                    type="fill-extrusion"
                    minzoom={14}
                    paint={{
                        'fill-extrusion-color': '#2a313e',
                        'fill-extrusion-height': ['get', 'render_height'],
                        'fill-extrusion-base': ['get', 'render_min_height'],
                        'fill-extrusion-opacity': 0.85
                    }}
                />

                <GeolocateControl position="top-right" />
                <FullscreenControl position="top-right" />
                <NavigationControl position="top-right" visualizePitch={true} />

                {/* Render Mock Students as Markers */}
                {mockStudents.map((student) => (
                    <Marker
                        key={student.id}
                        longitude={student.coordinates[0]}
                        latitude={student.coordinates[1]}
                        anchor="bottom"
                        onClick={(e: any) => {
                            e.originalEvent.stopPropagation();
                            setIsIdle(false);
                            setViewState({
                                ...viewState,
                                longitude: student.coordinates[0],
                                latitude: student.coordinates[1],
                                zoom: 15.5,
                                pitch: 60
                            });
                            setSelectedStudent(student);
                        }}
                    >
                        <div className="relative group cursor-pointer animate-fade-in-up">
                            {/* Status Indicator Dot */}
                            <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 z-10 ${getStatusColor(student.status)}`}></div>

                            {/* Avatar Container */}
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-xl group-hover:border-brand-primary transition-colors duration-300">
                                <Image
                                    src={student.avatarUrl}
                                    alt={student.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>

                            {/* Pin Tail */}
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white/20 mx-auto mt-0.5 group-hover:border-t-brand-primary transition-colors duration-300"></div>
                        </div>
                    </Marker>
                ))}

                {/* Render User "Check In" Marker */}
                {userLocation && (
                    <Marker
                        longitude={userLocation[0]}
                        latitude={userLocation[1]}
                        anchor="bottom"
                    >
                        <div className="relative animate-bounce">
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 z-10 bg-brand-secondary animate-pulse"></div>
                            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-brand-secondary shadow-[0_0_20px_rgba(var(--brand-secondary-rgb),0.6)]">
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-xl font-bold text-white">You</span>
                                </div>
                            </div>
                            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-brand-secondary mx-auto mt-0.5"></div>
                        </div>
                    </Marker>
                )}

                {/* Popup for Selected Student */}
                {selectedStudent && (
                    <Popup
                        longitude={selectedStudent.coordinates[0]}
                        latitude={selectedStudent.coordinates[1]}
                        anchor="top"
                        onClose={() => setSelectedStudent(null)}
                        className="rounded-2xl overflow-hidden"
                        closeButton={false}
                        offset={15}
                    >
                        <div className="bg-slate-900 p-4 border border-white/10 rounded-xl min-w-[200px] shadow-2xl">
                            <div className="flex items-center gap-3 mb-3">
                                <Image src={selectedStudent.avatarUrl} alt={selectedStudent.name} width={40} height={40} className="rounded-full border border-white/20" />
                                <div>
                                    <h3 className="font-bold text-white text-base leading-tight">{selectedStudent.name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${getStatusColor(selectedStudent.status)}`}></span>
                                        <span className="text-xs text-white/70">{getStatusText(selectedStudent.status)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-white/10">
                                <p className="text-xs text-white/50 mb-1">Location</p>
                                <div className="flex items-center gap-2 text-sm text-brand-primary font-medium">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {selectedStudent.university}
                                </div>
                            </div>
                            <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                                Say Hello 👋
                            </button>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Floating UI Overlay Panel */}
            <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-blue-400">
                            Aladdin Social
                        </h1>
                        <div className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {mockStudents.length} Nearby
                        </div>
                    </div>

                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                        Discover other international students around Malaysia. Share your location to find study buddies!
                    </p>

                    <button
                        onClick={handleCheckIn}
                        className={`w-full relative group overflow-hidden ${userLocation ? 'bg-brand-secondary' : 'bg-brand-primary hover:bg-brand-primary/90'} text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                        {userLocation ? (
                            <>
                                <MapPin className="w-5 h-5 animate-bounce-slow" />
                                Checked In!
                            </>
                        ) : (
                            <>
                                <Navigation className="w-5 h-5" />
                                Check In My Location
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                    </button>
                </div>
            </div>

        </div>
    );
}
