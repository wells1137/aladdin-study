'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl, Popup, Layer, MapRef } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Users, Compass, Navigation, Plus, LogOut, CheckCircle2, X } from 'lucide-react';
import { mockMapData, MapItem, MapItemType } from '@/lib/mockMapData';
import { useAuth } from './AuthContext';
import StudentAuthModal from './StudentAuthModal';
import StudentPinModal from './StudentPinModal';
import EditProfileModal from './EditProfileModal';
import Image from 'next/image';

export default function SocialMap({ className }: { className?: string }) {
    const { isStudent, user, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [livePosts, setLivePosts] = useState<MapItem[]>([]);

    const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [filterType, setFilterType] = useState<MapItemType | 'all'>('all');
    const [isIdle, setIsIdle] = useState(true);
    const [isPinningMode, setIsPinningMode] = useState(false);
    const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
    const [draftLocation, setDraftLocation] = useState<[number, number] | null>(null);
    const animationRef = useRef<number | null>(null);
    const mapRef = useRef<MapRef>(null);

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

    const fetchPosts = useCallback(async () => {
        try {
            const res = await fetch('/api/posts');
            if (res.ok) {
                const data = await res.json();
                const formattedPosts: MapItem[] = data.map((post: any) => ({
                    id: post.id,
                    type: post.type as MapItemType,
                    coordinates: [post.longitude, post.latitude] as [number, number],
                    name: post.author?.name || 'Aladdin Scholar',
                    university: post.author?.university || '',
                    status: 'online',
                    avatar: post.author?.avatarUrl || '',
                    title: post.title,
                    description: post.description,
                    imageUrl: post.imageUrl
                }));
                setLivePosts(formattedPosts);
            }
        } catch (e) {
            console.error("Failed to fetch live posts", e);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Handle Map Location Selection Activation
    const handleManualPin = () => {
        setIsIdle(false);
        if (!isStudent) {
            setIsAuthModalOpen(true);
            return;
        }
        setIsPinningMode(true);
        setDraftLocation(null);
        setIsInfoPanelOpen(false); // Hide panel so user can see map clearly
    };

    const handleGPSPin = () => {
        setIsIdle(false);
        if (!isStudent) {
            setIsAuthModalOpen(true);
            return;
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
                mapRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 15.5,
                    pitch: 65,
                    bearing: 0,
                    duration: 2000,
                    essential: true
                });
            }, (error) => {
                console.error("获取位置失败: ", error);
                alert("无法获取当前位置，请检查浏览器的定位权限设置。");
            });
        } else {
            alert("您的浏览器不支持 GPS 定位。");
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

    const getStatusText = (status?: string) => {
        if (!status) return '';
        switch (status) {
            case 'online': return 'Online';
            case 'studying': return 'At Library / Class';
            case 'chilling': return 'Hanging out';
            default: return 'Offline';
        }
    };

    const allData = useMemo(() => [...mockMapData, ...livePosts], [livePosts]);
    const filteredData = allData.filter(item => filterType === 'all' || item.type === filterType);

    return (
        <div className={`relative bg-slate-900 border-y border-white/10 ${className || 'w-full h-[calc(100vh-80px)] mt-20'}`}
            onMouseEnter={() => setIsIdle(false)}
            onMouseLeave={() => setIsIdle(true)}
            onTouchStart={() => setIsIdle(false)}>

            {/* Category Filters Overlay - Simplified */}
            {!isPinningMode && (
                <div className="absolute top-6 right-4 z-20 flex flex-wrap justify-end gap-2 px-4 pointer-events-auto">
                    {(['all', 'student'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-md border border-white/10 shadow-lg capitalize flex items-center gap-2
                            ${filterType === type ? 'bg-white text-slate-900' : 'bg-slate-900/60 text-white hover:bg-slate-800'}`}
                        >
                            {type === 'all' && '全部校友'}
                            {type === 'student' && <><Users className="w-4 h-4" /> 校友目录</>}
                        </button>
                    ))}
                </div>
            )}

            {/* Pinning Mode Instructions Overlay */}
            {isPinningMode && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-brand-primary/90 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">请在地图上点击您所在的位置 (公寓/学校)</span>
                </div>
            )}

            {/* MAPLIBRE TILE SERVER - using Carto Dark Matter free tiles for a premium look */}
            <Map
                ref={mapRef}
                {...viewState}
                onClick={(e: any) => {
                    if (isPinningMode && e.lngLat) {
                        setDraftLocation([e.lngLat.lng, e.lngLat.lat]);
                        mapRef.current?.flyTo({
                            center: [e.lngLat.lng, e.lngLat.lat],
                            zoom: 16,
                            duration: 800,
                            essential: true
                        });
                    } else if (!isPinningMode) {
                        setSelectedItem(null); // Click anywhere else to close popup nicely
                    }
                }}
                cursor={isPinningMode ? "crosshair" : "grab"}
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

                {/* Draft Marker during Pinning Mode */}
                {isPinningMode && draftLocation && (
                    <Marker
                        longitude={draftLocation[0]}
                        latitude={draftLocation[1]}
                        anchor="bottom"
                    >
                        <div className="relative group flex flex-col items-center">
                            <div className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl mb-1 shadow-lg border border-white/20 whitespace-nowrap animate-fade-in-up">
                                这是您的位置
                            </div>
                            <div className="bg-brand-primary p-2 rounded-full border-2 border-white shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)] animate-pulse">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-1.5 h-6 bg-brand-primary/50"></div>
                            <div className="w-3 h-1 bg-black/30 rounded-full blur-[2px]"></div>
                        </div>
                    </Marker>
                )}

                {/* Render Filtered Data as Custom Markers */}
                {filteredData.map((item) => (
                    <Marker
                        key={item.id}
                        longitude={item.coordinates[0]}
                        latitude={item.coordinates[1]}
                        anchor="bottom"
                        onClick={(e: any) => {
                            e.originalEvent.stopPropagation();
                            setIsIdle(false);
                            mapRef.current?.flyTo({
                                center: [item.coordinates[0], item.coordinates[1]],
                                zoom: 16,
                                pitch: 60,
                                duration: 1200,
                                essential: true
                            });
                            setSelectedItem(item);
                        }}
                    >
                        <div className="relative group cursor-pointer animate-fade-in-up">
                            {/* Marker Styling based on MapItemType */}
                            {item.type === 'student' ? (
                                <>
                                    {/* Student Avatar Pin */}
                                    <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 z-10 ${getStatusColor(item.status || '')}`}></div>
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-xl group-hover:border-brand-primary transition-colors duration-300">
                                        <Image
                                            src={item.avatarUrl || ''}
                                            alt={item.title}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* POI Pin (Student) fallback */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 bg-brand-primary border-brand-primary text-brand-primary`}>
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                </>
                            )}

                            {/* Pin Tail */}
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto mt-0.5 border-t-white/20 group-hover:border-t-brand-primary transition-colors duration-300"></div>
                        </div>
                    </Marker>
                ))}

                {/* Render User "Check In" Marker (If they hold a valid location session outside pinning) */}
                {!isPinningMode && userLocation && (
                    <Marker
                        longitude={userLocation[0]}
                        latitude={userLocation[1]}
                        anchor="bottom"
                    >
                        <div className="relative animate-bounce">
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 z-10 bg-brand-secondary animate-pulse"></div>
                            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-brand-secondary shadow-[0_0_20px_rgba(var(--brand-secondary-rgb),0.6)]">
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">你</span>
                                </div>
                            </div>
                            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-brand-secondary mx-auto mt-0.5"></div>
                        </div>
                    </Marker>
                )}

                {/* Rich Popup for Selected Item */}
                {selectedItem && (
                    <Popup
                        longitude={selectedItem.coordinates[0]}
                        latitude={selectedItem.coordinates[1]}
                        anchor="top"
                        onClose={() => setSelectedItem(null)}
                        className="rounded-2xl overflow-hidden z-50"
                        closeButton={false}
                        offset={15}
                    >
                        <div className="bg-slate-900 border border-white/10 rounded-xl w-[260px] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">

                            {/* No Banner needed since we don't have images in Student Directory */}

                            {/* Popup Content */}
                            <div className="p-4 relative">
                                {/* Header: Avatar & Title */}
                                <div className="flex gap-3 mb-2">
                                    {selectedItem.avatarUrl && (
                                        <Image src={selectedItem.avatarUrl} alt="author" width={40} height={40} className="rounded-full border border-white/20 self-start shrink-0" />
                                    )}
                                    {/* Header Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h3 className="font-bold text-white text-base truncate">{selectedItem.title}</h3>
                                            {selectedItem.status && (
                                                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10 uppercase tracking-wider">
                                                    {getStatusText(selectedItem.status)}
                                                </span>
                                            )}
                                        </div>
                                        {selectedItem.subtitle && (
                                            <p className="text-sm font-medium text-slate-300 truncate">
                                                🎓 {selectedItem.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {/* Body: Status or Description */}
                                <div className="flex items-center gap-2 mt-3 text-sm">
                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedItem.status || '')}`}></div>
                                    <span className="text-slate-300">{getStatusText(selectedItem.status)}</span>
                                </div>

                                {/* Action Button */}
                                <button className="w-full mt-4 py-2 bg-white/5 hover:bg-brand-primary text-white text-sm font-medium rounded-lg transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                                    打个招呼 👋
                                </button>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Floating Action Button & Check-In Panel */}
            <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-4">
                {isStudent && (
                    <button
                        onClick={logout}
                        className="w-14 h-14 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-700 hover:text-white transition-all focus:outline-none"
                        title="退出登录"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                )}
                <button
                    onClick={() => {
                        if (!isStudent) {
                            setIsAuthModalOpen(true);
                        } else {
                            setIsPinningMode(prev => !prev);
                            setDraftLocation(null);
                            if (isPinningMode && draftLocation) {
                                setIsCreateModalOpen(true);
                            }
                        }
                    }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(var(--brand-primary-rgb),0.5)] hover:scale-105 transition-all focus:outline-none
                        ${isPinningMode ? 'bg-brand-secondary hover:bg-brand-secondary/90' : 'bg-brand-primary hover:bg-brand-primary/90'}`}
                    aria-label="在地图上选点标记"
                >
                    <Plus className="w-7 h-7" />
                </button>
            </div>

            {/* Floating UI Overlay Panel */}
            {isInfoPanelOpen && (
                <div className="absolute top-4 left-4 z-10 w-full max-w-sm">
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl relative">
                        <button
                            onClick={() => setIsInfoPanelOpen(false)}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white transition-all cursor-pointer z-50"
                            aria-label="关闭"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center justify-between mb-4 pr-6">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-blue-400">
                                阿拉丁校友圈
                            </h1>
                            <div className="bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
                                <Users className="w-3.5 h-3.5" />
                                附近 {allData.length} 人
                            </div>
                        </div>

                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            在这里发现马来西亚的留学生们。分享你的位置，寻找志同道合的学习伙伴吧！🎉
                        </p>
                        {isStudent && user && (
                            <div className="flex items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-xl mb-6 shadow-inner group">
                                <div className="flex items-center gap-3">
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="rounded-full border border-white/20" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/20"><Users className="w-5 h-5 text-slate-400" /></div>
                                    )}
                                    <div>
                                        <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
                                        <p className="text-xs text-slate-400">{user.university || 'Aladdin Scholar'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditProfileModalOpen(true)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-primary text-slate-400 hover:text-white transition-colors"
                                    title="编辑资料"
                                >
                                    <span className="text-xs">✏️</span>
                                </button>
                            </div>
                        )}

                        {/* 两种打卡模式选项 */}
                        <div className="flex flex-col gap-3">
                            {/* 手动选点按钮 */}
                            <button
                                onClick={handleManualPin}
                                className={`w-full relative group overflow-hidden ${isPinningMode ? 'bg-brand-secondary' : 'bg-brand-primary hover:bg-brand-primary/90'} text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 flex-shrink-0" />
                                    <span className="truncate">手动在地图上选点</span>
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                            </button>

                            {/* GPS 定位按钮 */}
                            <button
                                onClick={handleGPSPin}
                                className={`w-full relative group overflow-hidden ${userLocation ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'} border border-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {userLocation ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            <span className="truncate">GPS 定位已完成</span>
                                        </>
                                    ) : (
                                        <>
                                            <Navigation className="w-5 h-5 flex-shrink-0" />
                                            <span className="truncate">使用 GPS 自动定位</span>
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            <StudentAuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />

            {/* Student Pin Modal */}
            <StudentPinModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                currentLocation={draftLocation ? { longitude: draftLocation[0], latitude: draftLocation[1] } : null}
                onSuccess={() => {
                    setIsCreateModalOpen(false);
                    setIsPinningMode(false);
                    setDraftLocation(null);
                    fetchPosts();
                }}
            />
            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isEditProfileModalOpen}
                onClose={() => setIsEditProfileModalOpen(false)}
            />
        </div>
    );
}
