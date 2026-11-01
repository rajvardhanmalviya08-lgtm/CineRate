const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const MovieRating = require('../models/MovieRating');
const Review = require('../models/Review');
const Watchlist = require('../models/Watchlist');
const Favorite = require('../models/Favorite');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cinerate');
    console.log('[Seeder] Connected to database');

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      MovieRating.deleteMany(),
      Review.deleteMany(),
      Watchlist.deleteMany(),
      Favorite.deleteMany(),
    ]);
    console.log('[Seeder] Existing collections cleared');

    // Create Admin and Standard Users
    const adminUser = await User.create({
      name: 'Admin CineRate',
      email: 'admin@cinerate.com',
      password: 'Admin@123456',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      bio: 'CineRate Platform Administrator & Chief Film Critic.',
    });

    const criticUser = await User.create({
      name: 'Elena Vance',
      email: 'critic@cinerate.com',
      password: 'User@123456',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      bio: 'Lifelong cinephile, screenwriter, and lover of dramatic cinema.',
    });

    const userDave = await User.create({
      name: 'Dave Miller',
      email: 'user@cinerate.com',
      password: 'User@123456',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
      bio: 'Sci-fi & Christopher Nolan enthusiast.',
    });

    console.log('[Seeder] Users created successfully');

    // Seed Ratings & Reviews
    const sampleReviews = [
      {
        userId: criticUser._id,
        movieId: 872585, // Oppenheimer
        movieTitle: 'Oppenheimer',
        posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        title: 'A towering, breathtaking cinematic achievement',
        content: 'Christopher Nolan crafts an epic historical drama that pulses like a nuclear reactor. Cillian Murphy delivers a career-defining performance as the tormented genius. The sound design during the Trinity test is unforgettable.',
        rating: 10,
        likes: [adminUser._id, userDave._id],
      },
      {
        userId: userDave._id,
        movieId: 157336, // Interstellar
        movieTitle: 'Interstellar',
        posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        title: 'Hans Zimmer score and emotional storytelling',
        content: 'The scale, science, and the emotional resonance between Cooper and Murph make this one of the greatest space journeys ever put on celluloid. A masterclass in modern sci-fi.',
        rating: 9,
        likes: [criticUser._id],
      },
      {
        userId: adminUser._id,
        movieId: 579974, // RRR
        movieTitle: 'RRR',
        posterPath: '/nEufeZlyAOLqO2brrs0yeMu1QXO.jpg',
        title: 'Pure electrifying kinetic entertainment',
        content: 'Rajamouli delivers spectacle on a celestial scale! The Naatu Naatu sequence and the wild animal release scene are unmatched in modern theater experience.',
        rating: 9,
        likes: [criticUser._id, userDave._id],
      },
      {
        userId: userDave._id,
        movieId: 155, // The Dark Knight
        movieTitle: 'The Dark Knight',
        posterPath: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        title: 'The gold standard for comic book films',
        content: 'Heath Ledger redefined the Joker and villains in cinema history. Gripping, philosophical, and thoroughly riveting from the bank heist to the final monologue.',
        rating: 10,
        likes: [adminUser._id],
      },
      {
        userId: criticUser._id,
        movieId: 693134, // Dune: Part Two
        movieTitle: 'Dune: Part Two',
        posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        title: 'Sensory overload and majestic world-building',
        content: 'Denis Villeneuve expands on Arrakis with awe-inspiring visuals, incredible sound design, and an intensely charismatic turn from Timothée Chalamet.',
        rating: 9,
        likes: [userDave._id],
      },
    ];

    for (const r of sampleReviews) {
      await Review.create(r);
      await MovieRating.create({
        userId: r.userId,
        movieId: r.movieId,
        movieTitle: r.movieTitle,
        posterPath: r.posterPath,
        rating: r.rating,
      });
    }

    // Seed Watchlist items
    await Watchlist.create([
      {
        userId: userDave._id,
        movieId: 693134,
        movieTitle: 'Dune: Part Two',
        posterPath: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        backdropPath: '/xOMo8BRK7PfcJv9JCnx7s520W4q.jpg',
        releaseDate: '2024-02-27',
        voteAverage: 8.2,
        watched: true,
      },
      {
        userId: userDave._id,
        movieId: 533535,
        movieTitle: 'Deadpool & Wolverine',
        posterPath: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        backdropPath: '/yDHYTfA3R0jFYba16jBB1jv8vEU.jpg',
        releaseDate: '2024-07-24',
        voteAverage: 7.7,
        watched: false,
      },
    ]);

    // Seed Favorite items
    await Favorite.create([
      {
        userId: userDave._id,
        movieId: 157336,
        movieTitle: 'Interstellar',
        posterPath: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        backdropPath: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
        releaseDate: '2014-11-05',
        voteAverage: 8.4,
      },
      {
        userId: userDave._id,
        movieId: 872585,
        movieTitle: 'Oppenheimer',
        posterPath: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        backdropPath: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
        releaseDate: '2023-07-19',
        voteAverage: 8.1,
      },
    ]);

    console.log('[Seeder] Database successfully populated with initial data!');
    console.log('--------------------------------------------------');
    console.log('Admin Account:   admin@cinerate.com  / Admin@123456');
    console.log('User Account:    user@cinerate.com   / User@123456');
    console.log('Critic Account:  critic@cinerate.com / User@123456');
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]', error);
    process.exit(1);
  }
};

seedData();

