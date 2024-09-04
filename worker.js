import Bull from 'bull';
import dbClient from './utils/db';

// Create a Bull queue named 'userQueue'
export const userQueue = new Bull('userQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

// Process the 'userQueue' queue
userQueue.process(async (job, done) => {
  const { userId } = job.data;

  if (!userId) {
    return done(new Error('Missing userId'));
  }

  const user = await dbClient.usersCollection.findOne({ _id: userId });

  if (!user) {
    return done(new Error('User not found'));
  }

  console.log(`Welcome ${user.email}!`);
  done();
});
