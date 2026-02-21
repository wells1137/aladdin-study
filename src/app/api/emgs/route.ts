import { NextRequest, NextResponse } from 'next/server';

// Simulated EMGS Milestones
const standardMilestones = [
    { id: 1, label: 'Application Received', description: 'Your application has been received by EMGS.', completed: true, date: '2024-03-01' },
    { id: 2, label: 'Document Verification', description: 'Your documents are being verified for authenticity.', completed: true, date: '2024-03-05' },
    { id: 3, label: 'Immigration Approval (VAL)', description: 'Visa Approval Letter (VAL) processing.', completed: false, date: null },
    { id: 4, label: 'VAL Issued', description: 'VAL is ready for download. Please proceed to the nearest embassy.', completed: false, date: null },
    { id: 5, label: 'eVAL Downloaded', description: 'You have downloaded the eVAL.', completed: false, date: null },
];

export async function POST(req: NextRequest) {
    try {
        const { passport, nationality } = await req.json();

        // Basic validation
        if (!passport || !nationality) {
            return NextResponse.json({ error: 'Please provide both Passport Number and Nationality.' }, { status: 400 });
        }

        // Simulate network delay to make the UI loading state visible
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate deterministic mock data based on the passport string length/characters
        // This is just a fun way to return different looking mock data for testing
        const passportHash = passport.length + passport.charCodeAt(0);

        let progress = 0;
        let milestones = JSON.parse(JSON.stringify(standardMilestones)); // Deep copy

        if (passportHash % 3 === 0) {
            // Scenario 1: Just started
            progress = 15;
            milestones[1].completed = false;
            milestones[1].date = null;
        } else if (passportHash % 3 === 1) {
            // Scenario 2: Processing VAL
            progress = 32;
            milestones[2].completed = true;
            milestones[2].date = new Date().toISOString().split('T')[0];
        } else {
            // Scenario 3: Almost done (70%)
            progress = 70;
            milestones[2].completed = true;
            milestones[2].date = '2024-03-10';
            milestones[3].completed = true;
            milestones[3].date = '2024-03-15';
        }

        // Return the mock payload
        return NextResponse.json({
            success: true,
            data: {
                studentName: 'ALADDIN SCHOLAR',
                passportNumber: passport.toUpperCase(),
                nationality: nationality.toUpperCase(),
                applicationNumber: `E${Math.floor(Math.random() * 100000000)}`,
                institution: 'UNIVERSITY OF MALAYA',
                course: 'BACHELOR OF COMPUTER SCIENCE',
                progress,
                status: progress === 70 ? 'VAL Issued' : progress === 32 ? 'Processing' : 'Application Received',
                milestones
            }
        });

    } catch (error) {
        console.error('EMGS API Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve EMGS status. Please try again later.' }, { status: 500 });
    }
}
