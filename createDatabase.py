import sqlite3
db = sqlite3.connect('db.sqlite')
cursor = db.cursor()

# Drop tables if tables exist
db.execute('''DROP TABLE IF EXISTS users''') 
db.execute('''DROP TABLE IF EXISTS followers''')
db.execute('''DROP TABLE IF EXISTS posts''')
db.execute('''DROP TABLE IF EXISTS likes''')
db.execute('''DROP TABLE IF EXISTS comments''')
db.execute('''DROP TABLE IF EXISTS messages''')

# Create tables
db.execute('''CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    image TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
    bio TEXT NOT NULL
)''')

db.execute('''CREATE TABLE IF NOT EXISTS followers (
    user_id INTEGER NOT NULL,        
    follower_id INTEGER NOT NULL,    
    PRIMARY KEY (user_id, follower_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    image TEXT NOT NULL,
    caption TEXT NOT NULL,
    created_at TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY,
    created_at TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    receiver_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(receiver_id) REFERENCES users(id),
    FOREIGN KEY(sender_id) REFERENCES users(id)
)''')

# Insert records
cursor.executemany('''
    INSERT INTO users (name, username, password, email, image, bio)
    VALUES (?, ?, ?, ?, ?, ?)
''', [
    ('Qiao Ling', 'qiaoling_77', '123456', 'qiaoling@example.com', 'https://static.myfigurecollection.net/upload/entries/1/320090-48b39.jpg', 'Dieting'),
    ('Lu Guang', 'luguang_92', '123456', 'luguang@example.com', 'https://pbs.twimg.com/profile_images/1873536351678664704/6IEQ-nVu_400x400.jpg', "Hey there! I'm using Insta"),
    ('Cheng Xiao Shi', 'xiaoshi_03', '123456', 'xiaoshi@example.com', 'https://pbs.twimg.com/media/FMOCzfWWUAgBbOZ.jpg', 'Yahoooo!!!'),
    ('Li Tian Xi', 'litianxi_09', '123456', 'litianxi@example.com', 'https://pbs.twimg.com/media/GBmm_28WsAAtfBC.jpg', '><'),
    ('Li Tian Chen', 'litianchen_88', '123456', 'litianchen@example.com', 'https://s4.anilist.co/file/anilistcdn/character/large/b313878-X0gZ1Q4CJkHf.png', 'Huh?'),
    ('Vein', 'vein_66', '123456', 'vein@example.com', 'https://i.pinimg.com/236x/08/a3/66/08a366abd1310f5ab4d9873a02c9f903.jpg', 'Hmmmmm'),
    ('Xu Shan Shan', 'xushan_07', '123456', 'xushan@example.com', 'https://static.wikia.nocookie.net/shiguang-dailiren/images/7/70/Xu_Shanshan_Profile.png/revision/latest?cb=20241101025448', 'Good Morning! Sunshine!'),
    ('Felix', 'felix_44', '123456', 'felix@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lPVtprb5pu2CIhubHijvQ_t9KsCtjkI-cQ&s', 'Need sleeepppp'),
    ('Liu Xiao', 'liuxiao_99', '123456', 'liuxiao@example.com', 'https://cdn.myanimelist.net/r/200x268/images/characters/11/580922.jpg?s=d5cad682288409f96be03ad09d79f4ec', 'Busy'),
    ('Hao Jun Pro', 'hj_666', '123456', 'haojun@example.com', 'https://cdn.myanimelist.net/r/200x268/images/characters/11/580922.jpg?s=d5cad682288409f96be03ad09d79f4ec', 'No mood to eat')
])

cursor.executemany('''
    INSERT INTO followers (user_id, follower_id)
    VALUES (?, ?)
''', [
    (1, 2), (1, 3), (1, 8),
    (2, 1), (2, 3), (2, 6),
    (3, 1), (3, 2), (3, 5),
    (4, 9), (4, 8),
    (5, 6), (5, 7), (5, 8),
    (6, 1), (6, 9),
    (7, 4), (7, 3),
    (8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 9),
    (9, 1), (9, 2), (9, 8)
])

cursor.executemany('''
    INSERT INTO posts (image, caption, created_at, user_id)
    VALUES (?, ?, ?, ?)
''', [
    ("https://static.myfigurecollection.net/upload/pictures/2012/10/19/544629.jpeg", "Matcha > Coffee. Change my mind.", "2025-03-28T10:15:00.000Z", 2),
    ("https://static.myfigurecollection.net/upload/pictures/2025/05/08/4400239.jpeg", "Bookstore vibes 📚", "2025-03-28T11:00:00.000Z", 3),
    ("https://static.myfigurecollection.net/upload/pictures/2016/06/09/1557922.jpeg", "Can I nap here forever?", "2025-03-28T12:45:00.000Z", 8),
    ("https://static.myfigurecollection.net/upload/pictures/2025/04/25/4385984.jpeg", "Sunset stroll 🌇", "2025-03-28T18:20:00.000Z", 4),
    ("https://static.myfigurecollection.net/upload/pictures/2025/04/22/4382375.jpeg", "Huh? What did I miss?", "2025-03-28T21:00:00.000Z", 5)
])

cursor.executemany('''
    INSERT INTO likes (created_at, post_id, user_id)
    VALUES (?, ?, ?)
''', [
    ("2025-03-28T10:20:00.000Z", 1, 3),
    ("2025-03-28T10:22:00.000Z", 2, 7),
    ("2025-03-28T11:05:00.000Z", 3, 1),
    ("2025-03-28T11:07:00.000Z", 3, 2),
    ("2025-03-28T12:50:00.000Z", 4, 7),
    ("2025-03-28T12:52:00.000Z", 4, 9),
    ("2025-03-28T18:30:00.000Z", 5, 6),
    ("2025-03-28T21:10:00.000Z", 5, 1),
    ("2025-03-28T21:12:00.000Z", 5, 4),
    ("2025-03-28T21:13:00.000Z", 5, 3)
])

cursor.executemany('''
    INSERT INTO comments (text, created_at, post_id, user_id)
    VALUES (?, ?, ?, ?)
''', [
    ("I agree! Matcha for life!", "2025-03-28T10:22:00.000Z", 1, 7),  
    ("Classic Xiao Shi haha", "2025-03-28T11:10:00.000Z", 2, 2),     
    ("Same mood 💤", "2025-03-28T12:55:00.000Z", 3, 1),
    ("Where was this taken? Beautiful!", "2025-03-28T18:25:00.000Z", 4, 9),
    ("You missed everything lol", "2025-03-28T21:15:00.000Z", 5, 6),
    ("LOL 🤣", "2025-03-28T21:16:00.000Z", 5, 3),
    ("So aesthetic!", "2025-03-28T18:26:00.000Z", 4, 2) 
])

cursor.executemany('''
    INSERT INTO messages (receiver_id, sender_id, text, created_at)
    VALUES (?, ?, ?, ?)
''', [
    (6, 5, "Want to join our movie night later?", "2025-03-28T17:30:00.000Z"),
    (5, 6, "Hmm. Maybe. Who's coming?", "2025-03-28T17:32:00.000Z"),
    (6, 5, "Just the usual gang. Felix's bringing snacks.", "2025-03-28T17:34:00.000Z"),
    (5, 6, "Then count me in.", "2025-03-28T17:36:00.000Z"),
    (9, 7, "Thanks for the like 😊", "2025-03-28T19:00:00.000Z"),
    (7, 9, "Anytime! That post was super relatable!", "2025-03-28T19:01:00.000Z")
])

db.commit()
db.close()
