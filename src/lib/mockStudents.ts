export interface StudentLocation {
    id: string;
    name: string;
    university: string;
    avatarUrl: string;
    status: 'online' | 'studying' | 'chilling' | 'offline';
    coordinates: [number, number]; // [longitude, latitude]
}

// Centered mostly around KL, Cyberjaya, and Penang (major student hubs)
export const mockStudents: StudentLocation[] = [
    {
        id: '1',
        name: 'Alice W.',
        university: 'Universiti Malaya (UM)',
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
        status: 'studying',
        coordinates: [101.6554, 3.1209] // UM Campus
    },
    {
        id: '2',
        name: 'John D.',
        university: 'Monash University Malaysia',
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
        status: 'online',
        coordinates: [101.6009, 3.0645] // Sunway City
    },
    {
        id: '3',
        name: 'Sarah Lee',
        university: "Taylor's University",
        avatarUrl: 'https://i.pravatar.cc/150?u=3',
        status: 'chilling',
        coordinates: [101.6167, 3.0626] // Taylors Lakeside
    },
    {
        id: '4',
        name: 'Michael T.',
        university: 'MMU Cyberjaya',
        avatarUrl: 'https://i.pravatar.cc/150?u=4',
        status: 'studying',
        coordinates: [101.6418, 2.9272] // MMU Cyberjaya
    },
    {
        id: '5',
        name: 'Chloe Eng',
        university: 'Limkokwing University',
        avatarUrl: 'https://i.pravatar.cc/150?u=5',
        status: 'online',
        coordinates: [101.6625, 2.9398] // Limkokwing
    },
    {
        id: '6',
        name: 'Kevin Tan',
        university: 'Universiti Putra Malaysia (UPM)',
        avatarUrl: 'https://i.pravatar.cc/150?u=6',
        status: 'offline',
        coordinates: [101.7144, 2.9927] // UPM Serdang
    },
    {
        id: '7',
        name: 'Amanda R.',
        university: 'Universiti Sains Malaysia (USM)',
        avatarUrl: 'https://i.pravatar.cc/150?u=7',
        status: 'studying',
        coordinates: [100.3013, 5.3582] // USM Penang
    },
    {
        id: '8',
        name: 'Jason Lim',
        university: 'INTI International College',
        avatarUrl: 'https://i.pravatar.cc/150?u=8',
        status: 'online',
        coordinates: [101.5905, 3.0763] // INTI Subang
    },
    {
        id: '9',
        name: 'Nur Aisyah',
        university: 'UiTM Shah Alam',
        avatarUrl: 'https://i.pravatar.cc/150?u=9',
        status: 'chilling',
        coordinates: [101.4984, 3.0673] // UiTM Shah Alam
    },
    {
        id: '10',
        name: 'Wei Jian',
        university: 'Sunway University',
        avatarUrl: 'https://i.pravatar.cc/150?u=10',
        status: 'online',
        coordinates: [101.6033, 3.0678] // Sunway Uni
    },
    {
        id: '11',
        name: 'Priya K.',
        university: 'Xiamen University Malaysia',
        avatarUrl: 'https://i.pravatar.cc/150?u=12',
        status: 'studying',
        coordinates: [101.7011, 2.8336] // XMUM Sepang
    }
];
