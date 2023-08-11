const seedData = [
    {
        userData: {
            userName: 'babysitter1',
            email: 'bbsit@example.com',
            password: 'password123',
            phoneNumber: '7772422222',
            firstName: 'Toni',
            lastName: 'Braxton',
            address: '123 Main St, Portland, Oregon 97221',
            bio: 'I am Toni and I love singing and babysitting.',
        },
        isSitter: true,
        sitterOrParentData: {
            yearsExperience: 7,
            qualifications: "CPR Training"

            
        },
        jobData: [
            {
                description: 'Looking for a babysitter for my two kids.',
                startTime: new Date('2023-08-07T08:00:00Z'),
                endTime: new Date('2023-08-07T12:00:00Z'),
                
            },
        ],
    },
    {
        userData: {
            userName: 'Parent1',
            email: 'parent1@example.com',
            password: 'password456',
            phoneNumber: '6666666666',
            firstName: 'Al',
            lastName: 'Jorgenson',
            address: '666 Elm St, Salem, Massachusetts 01915',
            bio: 'I enjoy making music and spending time with my kids.',
        },
        isSitter: false,
        sitterOrParentData: {
            
        },
        childData: [
            {
                firstName: 'Alex',
                lastName: 'Jorgenson',
                age: 7,
            },
            {
                firstName: 'Ella',
                lastName: 'Jorgenson',
                age: 4,
            },
        ],
    },
 
];

const seedAll = async () => {
    try {
        for (const seedEntry of seedData) {
            const {
                userData,
                isSitter,
                sitterOrParentData,
                childData,
                jobData
            } = seedEntry;

            const userResult = await createUser(userData, isSitter, sitterOrParentData, childData);

            if (jobData && jobData.length > 0) {
                let jobs;
                if (isSitter) {
                    jobs = await createJob(jobData, null, userResult.userId); // Use userId for workerId
                } else {
                    jobs = await createJob(jobData, userResult.userId, null); // Use userId for parentId
                }
                userResult.jobs = jobs.map(job => job.toJSON());
            }

            console.log('User created with jobs:', userResult);
        }
    } catch (error) {
        console.error('Error while seeding:', error);
    }
};

seedAll();