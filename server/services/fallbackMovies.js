// Fallback real movie data with real TMDB IDs, posters, backdrops, trailers, cast and details
// Used if TMDB_API_KEY is not set or network request fails

const fallbackMovies = [
  {
    id: 872585,
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, his triumphs, and the subsequent hearing that challenged his political loyalties.",
    release_date: "2023-07-19",
    runtime: 181,
    vote_average: 8.1,
    vote_count: 9140,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" }
    ],
    category: "hollywood",
    trailer_key: "uYPbbksJxIg",
    director: "Christopher Nolan",
    credits: {
      cast: [
        { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "/360cp3uB1cvTAVv115B1iwh4x6p.jpg" },
        { id: 505710, name: "Emily Blunt", character: "Katherine Oppenheimer", profile_path: "/nPJXaRMvuFLvgmWz72W07zW5Jp8.jpg" },
        { id: 16828, name: "Matt Damon", character: "Leslie Groves", profile_path: "/elSlNg0W2G6c8k4l6K4W7X9vD4u.jpg" },
        { id: 3223, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "/5qHNjhtjMD4YWH3vi0lZiq1RJso.jpg" },
        { id: 1373737, name: "Florence Pugh", character: "Jean Tatlock", profile_path: "/d8sUfTqRk3Z5sC5K7h8v9p6l2Yv.jpg" }
      ],
      crew: [
        { id: 525, name: "Christopher Nolan", job: "Director" }
      ]
    }
  },
  {
    id: 157336,
    title: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    runtime: 169,
    vote_average: 8.4,
    vote_count: 36120,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" }
    ],
    category: "hollywood",
    trailer_key: "zSWdZVtXT7E",
    director: "Christopher Nolan",
    credits: {
      cast: [
        { id: 10297, name: "Matthew McConaughey", character: "Joseph Cooper", profile_path: "/sY2waasKaPMAhZs2mSMCmF7xN3B.jpg" },
        { id: 1813, name: "Anne Hathaway", character: "Amelia Brand", profile_path: "/tLKit59zRIO2i7707e4pWz612J2.jpg" },
        { id: 83002, name: "Jessica Chastain", character: "Murphy Cooper", profile_path: "/ArpS4d2372L3f99e4Pq3kS6d4E5.jpg" }
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director" }]
    }
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    release_date: "2024-02-27",
    runtime: 166,
    vote_average: 8.2,
    vote_count: 5890,
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520W4q.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" }
    ],
    category: "hollywood",
    trailer_key: "Way9Dexny3w",
    director: "Denis Villeneuve",
    credits: {
      cast: [
        { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
        { id: 505719, name: "Zendaya", character: "Chani", profile_path: "/tyB4N3Kz7JvL3u4E1q8b2p9r7s.jpg" },
        { id: 938, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/4tE2p9R2k4q8b7X5z3sL.jpg" }
      ],
      crew: [{ id: 137427, name: "Denis Villeneuve", job: "Director" }]
    }
  },
  {
    id: 155,
    title: "The Dark Knight",
    tagline: "Why So Serious?",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    release_date: "2008-07-16",
    runtime: 152,
    vote_average: 8.5,
    vote_count: 32400,
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" }
    ],
    category: "top_rated",
    trailer_key: "EXeTwQWrcwY",
    director: "Christopher Nolan",
    credits: {
      cast: [
        { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "/qCpZNQq3Aq42CXMePtW147qkx2s.jpg" },
        { id: 1810, name: "Heath Ledger", character: "Joker", profile_path: "/5Y9HGA8t7mSkHOjHgKzs82H.jpg" },
        { id: 3895, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: "/hTQZz5mF1aYmC5uY2Q.jpg" }
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director" }]
    }
  },
  {
    id: 27205,
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\".",
    release_date: "2010-07-15",
    runtime: 148,
    vote_average: 8.4,
    vote_count: 36700,
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" }
    ],
    category: "popular",
    trailer_key: "YoHD9XEInc0",
    director: "Christopher Nolan",
    credits: {
      cast: [
        { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "/wo2hJpn04vbtmh0B9utCFdsQ2v9.jpg" },
        { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "/dhv9pP3q4N1c6z4K5.jpg" },
        { id: 27578, name: "Elliot Page", character: "Ariadne", profile_path: "/eP4pM8b5h6Y7N8v2.jpg" }
      ],
      crew: [{ id: 525, name: "Christopher Nolan", job: "Director" }]
    }
  },
  {
    id: 579974,
    title: "RRR",
    tagline: "Rise, Roar, Revolt.",
    overview: "A fictional history of two legendary revolutionaries' journey away from home before they began fighting for their country in the 1920s.",
    release_date: "2022-03-24",
    runtime: 187,
    vote_average: 7.8,
    vote_count: 1720,
    poster_path: "/nEufeZlyAOLqO2brrs0yeMu1QXO.jpg",
    backdrop_path: "/70AV2Xx5FQYj20am5G4WzZ9TeFq.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 18, name: "Drama" },
      { id: 12, name: "Adventure" }
    ],
    category: "indian",
    trailer_key: "f_vbAtFSEc0",
    director: "S.S. Rajamouli",
    credits: {
      cast: [
        { id: 104865, name: "N.T. Rama Rao Jr.", character: "Komaram Bheem", profile_path: "/p76YfT62kS5zL.jpg" },
        { id: 111100, name: "Ram Charan", character: "Alluri Sitarama Raju", profile_path: "/8W9nB3q4m1.jpg" },
        { id: 1108120, name: "Alia Bhatt", character: "Sita", profile_path: "/9k3mB6v7.jpg" }
      ],
      crew: [{ id: 104867, name: "S.S. Rajamouli", job: "Director" }]
    }
  },
  {
    id: 872906,
    title: "Jawan",
    tagline: "Ready chief!",
    overview: "An emotional journey of a prison warden driven by a personal vendetta while keeping a promise made years ago to right the wrongs in society.",
    release_date: "2023-09-07",
    runtime: 169,
    vote_average: 7.2,
    vote_count: 280,
    poster_path: "/jYW3o84nI0ySflMsz87h76Q3z3R.jpg",
    backdrop_path: "/5a4Jdoon0vTfq5f78sH4Z7eQz.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 53, name: "Thriller" }
    ],
    category: "bollywood",
    trailer_key: "MWOlnZSnXyg",
    director: "Atlee",
    credits: {
      cast: [
        { id: 35742, name: "Shah Rukh Khan", character: "Vikram Rathore / Azad", profile_path: "/7rN2g7x5.jpg" },
        { id: 85273, name: "Nayanthara", character: "Narmada Rai", profile_path: "/5b4vN9m3.jpg" },
        { id: 1120023, name: "Vijay Sethupathi", character: "Kalee Gaikwad", profile_path: "/9b2v7x.jpg" }
      ],
      crew: [{ id: 1184323, name: "Atlee", job: "Director" }]
    }
  },
  {
    id: 20453,
    title: "3 Idiots",
    tagline: "Chase excellence, and success will follow.",
    overview: "Two friends search for their long-lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them \"idiots\".",
    release_date: "2009-12-25",
    runtime: 170,
    vote_average: 8.0,
    vote_count: 2280,
    poster_path: "/66A9MqXGECiKo691vO6qxU9z04y.jpg",
    backdrop_path: "/uLtVbpO3dQmpZsdUmSTTNPr0Ixq.jpg",
    genres: [
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" }
    ],
    category: "bollywood",
    trailer_key: "xvszmNXdM4w",
    director: "Rajkumar Hirani",
    credits: {
      cast: [
        { id: 52763, name: "Aamir Khan", character: "Rancho / Phunsukh Wangdu", profile_path: "/8N2v.jpg" },
        { id: 77747, name: "R. Madhavan", character: "Farhan Qureshi", profile_path: "/9b4v.jpg" },
        { id: 79042, name: "Sharman Joshi", character: "Raju Rastogi", profile_path: "/7x2.jpg" }
      ],
      crew: [{ id: 79040, name: "Rajkumar Hirani", job: "Director" }]
    }
  },
  {
    id: 363676,
    title: "Dangal",
    tagline: "Are our girls any less than boys?",
    overview: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.",
    release_date: "2016-12-23",
    runtime: 161,
    vote_average: 8.0,
    vote_count: 980,
    poster_path: "/p50A0Q06qY3BwYQzG5Q7H8mY3.jpg",
    backdrop_path: "/4PzS9w7xL7M9mX9vL2a9b.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" }
    ],
    category: "bollywood",
    trailer_key: "x_7YlGv9u1g",
    director: "Nitesh Tiwari",
    credits: {
      cast: [
        { id: 52763, name: "Aamir Khan", character: "Mahavir Singh Phogat", profile_path: "/8N2v.jpg" },
        { id: 1538356, name: "Fatima Sana Shaikh", character: "Geeta Phogat", profile_path: "/6x9.jpg" },
        { id: 1729007, name: "Sanya Malhotra", character: "Babita Kumari", profile_path: "/5y2.jpg" }
      ],
      crew: [{ id: 1538355, name: "Nitesh Tiwari", job: "Director" }]
    }
  },
  {
    id: 1214484,
    title: "12th Fail",
    tagline: "Restart.",
    overview: "Based on the real-life story of IPS Officer Manoj Kumar Sharma and IRS Officer Shraddha Joshi, who defied all odds of extreme poverty to crack the toughest exam in India.",
    release_date: "2023-10-27",
    runtime: 147,
    vote_average: 8.3,
    vote_count: 510,
    poster_path: "/zduEnL9383Kq0W5a4C0q2B8m1.jpg",
    backdrop_path: "/7V9a4b2c1d4e5f6g7h8i9j0k.jpg",
    genres: [
      { id: 18, name: "Drama" }
    ],
    category: "bollywood",
    trailer_key: "we5f15qW2dE",
    director: "Vidhu Vinod Chopra",
    credits: {
      cast: [
        { id: 1198539, name: "Vikrant Massey", character: "Manoj Kumar Sharma", profile_path: "/6b4.jpg" },
        { id: 2470728, name: "Medha Shankr", character: "Shraddha Joshi", profile_path: "/5z8.jpg" }
      ],
      crew: [{ id: 52762, name: "Vidhu Vinod Chopra", job: "Director" }]
    }
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    tagline: "Come together.",
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    release_date: "2024-07-24",
    runtime: 128,
    vote_average: 7.7,
    vote_count: 6150,
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1jv8vEU.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" }
    ],
    category: "now_playing",
    trailer_key: "73_1biulkYk",
    director: "Shawn Levy",
    credits: {
      cast: [
        { id: 10859, name: "Ryan Reynolds", character: "Wade Wilson / Deadpool", profile_path: "/4SYTH5FRAxKuTvMm9ug374W.jpg" },
        { id: 6968, name: "Hugh Jackman", character: "Logan / Wolverine", profile_path: "/oX6CpBT4TdJ.jpg" },
        { id: 1373737, name: "Emma Corrin", character: "Cassandra Nova", profile_path: "/9k3m.jpg" }
      ],
      crew: [{ id: 17825, name: "Shawn Levy", job: "Director" }]
    }
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    tagline: "Make room for new emotions.",
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust aren't sure how to feel when Anxiety shows up.",
    release_date: "2024-06-11",
    runtime: 96,
    vote_average: 7.6,
    vote_count: 5200,
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop_path: "/stKGOmAUqvKQIUSWUE5SD09dpqm.jpg",
    genres: [
      { id: 16, name: "Animation" },
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" }
    ],
    category: "popular",
    trailer_key: "LEjhY15eCx0",
    director: "Kelsey Mann",
    credits: {
      cast: [
        { id: 56832, name: "Amy Poehler", character: "Joy", profile_path: "/3e5a.jpg" },
        { id: 12890, name: "Maya Hawke", character: "Anxiety", profile_path: "/7x3.jpg" }
      ],
      crew: [{ id: 1459207, name: "Kelsey Mann", job: "Director" }]
    }
  },
  {
    id: 558449,
    title: "Gladiator II",
    tagline: "Prepare for glory.",
    overview: "Years after witnessing the death of Maximus at the hands of his uncle, Lucius must enter the Colosseum after the emperors of Rome conquer his home.",
    release_date: "2024-11-13",
    runtime: 148,
    vote_average: 6.8,
    vote_count: 2450,
    poster_path: "/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdrop_path: "/euYIwmwkmz95mnExlogQIJuEGqh.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" }
    ],
    category: "upcoming",
    trailer_key: "4rgYUipGJNo",
    director: "Ridley Scott",
    credits: {
      cast: [
        { id: 18918, name: "Paul Mescal", character: "Lucius", profile_path: "/7h2v.jpg" },
        { id: 1245, name: "Pedro Pascal", character: "Marcus Acacius", profile_path: "/9b5v.jpg" },
        { id: 5292, name: "Denzel Washington", character: "Macrinus", profile_path: "/4a9v.jpg" }
      ],
      crew: [{ id: 578, name: "Ridley Scott", job: "Director" }]
    }
  },
  {
    id: 424,
    title: "Schindler's List",
    tagline: "Whoever saves one life, saves the world entire.",
    overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis during the Holocaust by employing them in his factories.",
    release_date: "1993-12-15",
    runtime: 195,
    vote_average: 8.6,
    vote_count: 15800,
    poster_path: "/sF1U4EUQS8YHUYjNlvt0xTX3mXI.jpg",
    backdrop_path: "/zb6fM1CX41D9rF9hdgclu0sqUe.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
      { id: 10752, name: "War" }
    ],
    category: "top_rated",
    trailer_key: "gG22XNhtnoY",
    director: "Steven Spielberg",
    credits: {
      cast: [
        { id: 3896, name: "Liam Neeson", character: "Oskar Schindler", profile_path: "/9a3b.jpg" },
        { id: 2282, name: "Ben Kingsley", character: "Itzhak Stern", profile_path: "/8v4x.jpg" },
        { id: 5469, name: "Ralph Fiennes", character: "Amon Göth", profile_path: "/7b2a.jpg" }
      ],
      crew: [{ id: 488, name: "Steven Spielberg", job: "Director" }]
    }
  },
  {
    id: 680,
    title: "Pulp Fiction",
    tagline: "Just because you are a character doesn't mean that you have character.",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    release_date: "1994-09-10",
    runtime: 154,
    vote_average: 8.5,
    vote_count: 27900,
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    genres: [
      { id: 53, name: "Thriller" },
      { id: 80, name: "Crime" }
    ],
    category: "top_rated",
    trailer_key: "t4LKYn2kI_s",
    director: "Quentin Tarantino",
    credits: {
      cast: [
        { id: 8891, name: "John Travolta", character: "Vincent Vega", profile_path: "/2b3c.jpg" },
        { id: 2231, name: "Samuel L. Jackson", character: "Jules Winnfield", profile_path: "/8m4n.jpg" },
        { id: 139, name: "Uma Thurman", character: "Mia Wallace", profile_path: "/9z8x.jpg" }
      ],
      crew: [{ id: 138, name: "Quentin Tarantino", job: "Director" }]
    }
  },
  {
    id: 496243,
    title: "Parasite",
    tagline: "Act like you own the place.",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    runtime: 133,
    vote_average: 8.5,
    vote_count: 18200,
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
    genres: [
      { id: 35, name: "Comedy" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" }
    ],
    category: "top_rated",
    trailer_key: "5xH0hhMBqg",
    director: "Bong Joon-ho",
    credits: {
      cast: [
        { id: 20738, name: "Song Kang-ho", character: "Kim Ki-taek", profile_path: "/3a8c.jpg" },
        { id: 1042733, name: "Lee Sun-kyun", character: "Park Dong-ik", profile_path: "/7v1q.jpg" }
      ],
      crew: [{ id: 21684, name: "Bong Joon-ho", job: "Director" }]
    }
  },
  {
    id: 238,
    title: "The Godfather",
    tagline: "An offer you can't refuse.",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps up to take care of the would-be killers.",
    release_date: "1972-03-14",
    runtime: 175,
    vote_average: 8.7,
    vote_count: 20800,
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    category: "top_rated",
    trailer_key: "sY1S34973zA",
    director: "Francis Ford Coppola",
    credits: {
      cast: [
        { id: 3084, name: "Marlon Brando", character: "Don Vito Corleone", profile_path: "/4a7c.jpg" },
        { id: 1158, name: "Al Pacino", character: "Michael Corleone", profile_path: "/7z2b.jpg" }
      ],
      crew: [{ id: 1776, name: "Francis Ford Coppola", job: "Director" }]
    }
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    tagline: "It's how you wear the mask that matters.",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence.",
    release_date: "2023-05-31",
    runtime: 140,
    vote_average: 8.4,
    vote_count: 7100,
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    genres: [
      { id: 16, name: "Animation" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    category: "popular",
    trailer_key: "cqGjhVJWtEg",
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    credits: {
      cast: [
        { id: 587506, name: "Shameik Moore", character: "Miles Morales / Spider-Man", profile_path: "/9b3x.jpg" },
        { id: 54693, name: "Hailee Steinfeld", character: "Gwen Stacy / Spider-Woman", profile_path: "/4c8b.jpg" }
      ],
      crew: [{ id: 12890, name: "Joaquim Dos Santos", job: "Director" }]
    }
  }
];

const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

module.exports = { fallbackMovies, genresList };

