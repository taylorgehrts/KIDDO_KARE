const { createJob, createUser } = require('../models/lib/create');

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

            
        }
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
                name: 'Alex',
                age: 7,
            },
            {
                name: 'Ella',
                age: 4,
            },
        ],
        jobData: [
            {
                description: 'Looking for a babysitter for my two kids.',
                startTime: new Date('2023-08-20T08:00:00Z'),
                endTime: new Date('2023-08-22T12:00:00Z'),
                
            },
            {
                description: "test1",
                startTime: new Date('2023-08-11'),
                endTime: new Date('2023-08-12')
            }
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

            const userId = userResult.user.id;

            if (jobData && jobData.length > 0) {
                let jobs;
                jobs = await createJob(userId, jobData); 
                userResult.jobs = jobs.map(job => job.toJSON());
            }

            console.log('User created with jobs:', userResult);
        }
    } catch (error) {
        console.error('Error while seeding:', error);
    }
};

module.exports = seedAll;