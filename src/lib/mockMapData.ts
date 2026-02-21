export type MapItemType = 'student';

export interface MapItem {
    id: string;
    type: MapItemType;
    coordinates: [number, number]; // [longitude, latitude]

    // Properties common to all or specifically students
    title: string;          // Name of student (from DB) or Apartment Name (from Modal)
    subtitle?: string;      // University or location name
    avatarUrl?: string;     // Student avatar

    // Status properties
    status?: 'online' | 'studying' | 'chilling' | 'offline'; // For 'student' type
}

// Centered mostly around KL, Cyberjaya, and Penang (major student hubs)
export const mockMapData: MapItem[] = [
    // Students
    {
        id: 'user-1',
        type: 'student',
        title: 'Alice W.',
        subtitle: 'Universiti Malaya (UM)',
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
        status: 'studying',
        coordinates: [101.6554, 3.1209] // UM Campus
    },
    {
        id: 'user-2',
        type: 'student',
        title: 'John D.',
        subtitle: 'Monash University Malaysia',
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
        status: 'online',
        coordinates: [101.6009, 3.0645] // Sunway City
    },
    {
        id: 'user-3',
        type: 'student',
        title: 'Sarah Lee',
        subtitle: "Taylor's University",
        avatarUrl: 'https://i.pravatar.cc/150?u=3',
        status: 'chilling',
        coordinates: [101.6167, 3.0626] // Taylors Lakeside
    },
    {
        id: 'user-4',
        type: 'student',
        title: 'Michael T.',
        subtitle: 'MMU Cyberjaya',
        avatarUrl: 'https://i.pravatar.cc/150?u=4',
        status: 'studying',
        coordinates: [101.6418, 2.9272]
    },
    {
        id: 'user-7',
        type: 'student',
        title: 'Amanda R.',
        subtitle: 'Universiti Sains Malaysia (USM)',
        avatarUrl: 'https://i.pravatar.cc/150?u=7',
        status: 'studying',
        coordinates: [100.3013, 5.3582]
    }
];
