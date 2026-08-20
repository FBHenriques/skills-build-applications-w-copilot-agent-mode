import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';
import { connectionString } from '../config/database';

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alexfit', email: 'alex@example.com', fullName: 'Alex Morgan', points: 920 },
      { username: 'jamieactive', email: 'jamie@example.com', fullName: 'Jamie Lee', points: 780 },
      { username: 'samstrong', email: 'sam@example.com', fullName: 'Sam Rivera', points: 650 },
    ]);

    await Team.create({
      name: 'Summit Striders',
      motto: 'Small steps, strong finish',
      members: users.map((user) => user._id),
    });

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 35, calories: 360 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, calories: 410 },
      { user: users[2]._id, type: 'Strength', durationMinutes: 30, calories: 240 },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 920, rank: 1 },
      { user: users[1]._id, points: 780, rank: 2 },
      { user: users[2]._id, points: 650, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Trail Starter',
        focus: 'Cardio',
        durationMinutes: 25,
        difficulty: 'Beginner',
        exercises: [
          { name: 'Incline walk', sets: 1, reps: 20 },
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
        ],
      },
      {
        name: 'Core Builder',
        focus: 'Core',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        exercises: [
          { name: 'Plank', sets: 3, reps: 45 },
          { name: 'Dead bug', sets: 3, reps: 12 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
