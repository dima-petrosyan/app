
-- Create the database
CREATE DATABASE app;

-- Connect to the database
\c app;

-- Create the first table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  surname VARCHAR(255),
  birthday DATE,
  city VARCHAR(66)
);

-- Insert sample data into table1
INSERT INTO users (name, surname, birthday, city)
VALUES
  ('John', 'Doe', '1990-01-01', 'New York'),
  ('Jane', 'Smith', '1992-03-15', 'Los Angeles'),
  ('Michael', 'Johnson', '1985-07-10', 'Chicago'),
  ('Emily', 'Brown', '1995-12-05', 'Houston'),
  ('William', 'Jones', '1998-09-20', 'Phoenix'),

  ('Sarah', 'Anderson', '1993-04-18', 'San Francisco'),
  ('Daniel', 'Wilson', '1987-11-27', 'Seattle'),
  ('Olivia', 'Taylor', '1999-06-13', 'Denver'),
  ('Ethan', 'Thomas', '1991-02-08', 'Boston'),
  ('Ava', 'Roberts', '1997-10-25', 'Dallas'),

  ('Liam', 'Martin', '1989-08-03', 'Atlanta'),
  ('Sophia', 'Clark', '1994-05-23', 'Miami'),
  ('Benjamin', 'Walker', '1996-01-11', 'Philadelphia'),
  ('Mia', 'White', '1992-03-09', 'San Diego'),
  ('James', 'Harris', '1998-12-29', 'Austin'),

  ('Charlotte', 'Young', '1993-06-19', 'Washington, D.C.'),
  ('Lily', 'Wilson', '1997-09-02', 'San Francisco'),
  ('Henry', 'Thompson', '1994-04-14', 'Seattle'),
  ('Amelia', 'Garcia', '1996-11-11', 'Denver'),
  ('Owen', 'Scott', '1991-07-23', 'Boston'),

  ('Ella', 'Baker', '1998-02-17', 'Dallas'),
  ('Sebastian', 'Gonzalez', '1993-10-09', 'Atlanta'),
  ('Grace', 'Wright', '1995-06-30', 'Miami'),
  ('Alexander', 'Mitchell', '1989-03-12', 'Philadelphia'),
  ('Chloe', 'Carter', '1992-12-24', 'San Diego'),

  ('Samuel', 'Harrison', '1999-08-08', 'Austin'),
  ('Scarlett', 'Evans', '1994-05-04', 'Chicago'),
  ('Leo', 'Hall', '1997-01-28', 'Los Angeles'),
  ('Victoria', 'Rivera', '1991-11-15', 'Phoenix'),
  ('Jack', 'Gomez', '1996-07-07', 'Houston');

-- Create the second table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255),
  created_at DATE,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO posts (title, content, created_at, user_id) 
VALUES
  ('The Thrill of the Stage', 'Witness captivating performances that will leave you spellbound and inspired.', '2023-01-05', 5),
  
  ('Mindful Living', 'Discover the art of mindfulness and find inner peace in the chaos of everyday life.', '2023-01-06', 6),
  ('A World of Books', 'Immerse yourself in the captivating stories and knowledge found within the pages.', '2023-01-07', 7),
  ('Adrenaline Rush', 'Experience heart-pounding adventures that will test your limits and leave you exhilarated.', '2023-01-08', 8),
  ('The Power of Music', 'Feel the power of music as it moves your soul and stirs emotions deep within.', '2023-01-09', 9),
  ('Capturing Moments', 'Unleash your creativity through the lens and capture the beauty of the world.', '2023-01-10', 10),
  
  ('Artistic Expressions', 'Immerse yourself in the world of art and witness the power of self-expression.', '2023-01-11', 11),
  ('Exploring Ancient Ruins', 'Step back in time and unravel the secrets of ancient civilizations.', '2023-01-12', 12),
  ('Mastering the Outdoors', 'Learn essential skills to conquer the great outdoors and embrace natures playground.', '2023-01-13', 13),
  ('Discovering Hidden Gems', 'Uncover hidden gems in your own city and experience the joy of new discoveries.', '2023-01-14', 14),
  ('The Magic of Dance', 'Witness the elegance and beauty of dance as it tells stories through movement.', '2023-01-15', 15),
  
  ('The World of Science', 'Explore the wonders of science and delve into the mysteries of the universe.', '2023-01-16', 16),
  ('Finding Inner Harmony', 'Embark on a journey of self-discovery and find harmony within yourself and the world.', '2023-01-17', 17),
  ('Thriving in the Digital Age', 'Discover the latest technologies and navigate the ever-evolving digital landscape.', '2023-01-18', 18),
  ('Embracing Cultural Diversity', 'Celebrate the richness of cultures around the world and embrace diversity.', '2023-01-19', 19),
  ('The Essence of Beauty', 'Unveil the beauty that surrounds us and appreciate the intricacies of art and nature.', '2023-01-20', 20),
  
  ('A Culinary Adventure', 'Indulge in a gastronomic journey with flavors from around the world.', '2023-01-26', 26),
  ('The Art of Expression', 'Experience the beauty and expressiveness of various art forms.', '2023-01-27', 27),
  ('Captivating Music Melodies', 'Immerse yourself in the enchanting melodies of different musical genres.', '2023-01-28', 28),
  ('Exploring the Cosmos', 'Embark on a cosmic voyage to unravel the mysteries of the universe.', '2023-01-29', 29),
  ('The Magic of Words', 'Discover the power and impact of words in storytelling and communication.', '2023-01-30', 30),
  
  ('Amazing Journey', 'This is an amazing journey filled with adventure and discovery.', '2023-02-01', 1),
  ('Exploring the Unknown', 'Embark on a thrilling exploration of the unknown and uncover hidden treasures.', '2023-02-02', 2),
  ('A Glimpse into History', 'Unravel the mysteries of the past as we delve into historical events.', '2023-02-03', 3),
  ('Inspiration Unleashed', 'Find inspiration in the most unexpected places and let your creativity soar.', '2023-02-04', 4),
  ('The Power of Nature', 'Witness the awe-inspiring power of nature and its breathtaking landscapes.', '2023-02-05', 5);

