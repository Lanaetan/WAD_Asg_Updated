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
    ('Li Tian Xi', 'litianxi_09', '123456', 'litianxi@example.com', 'https://pbs.twimg.com/media/GBmm_28WsAAtfBC.jpg', '> <'),
    ('Li Tian Chen', 'litianchen_88', '123456', 'litianchen@example.com', 'https://s4.anilist.co/file/anilistcdn/character/large/b313878-X0gZ1Q4CJkHf.png', 'Huh?'),
    ('Vein', 'vein_66', '123456', 'vein@example.com', 'https://i.pinimg.com/236x/08/a3/66/08a366abd1310f5ab4d9873a02c9f903.jpg', 'Hmmmmm'),
    ('Xu Shan Shan', 'xushan_07', '123456', 'xushan@example.com', 'https://static.wikia.nocookie.net/shiguang-dailiren/images/7/70/Xu_Shanshan_Profile.png/revision/latest?cb=20241101025448', 'Good Morning! Sunshine!'),
    ('Felix', 'felix_44', '123456', 'felix@example.com', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lPVtprb5pu2CIhubHijvQ_t9KsCtjkI-cQ&s', 'Need sleeepppp'),
    ('Liu Xiao', 'liuxiao_99', '123456', 'liuxiao@example.com', 'https://cdn.myanimelist.net/r/200x268/images/characters/11/580922.jpg?s=d5cad682288409f96be03ad09d79f4ec', 'Busy'),
    ('Hao Jun Pro', 'hj_666', '123456', 'haojun@example.com', 'https://i.pinimg.com/736x/a7/e8/c1/a7e8c13bbc4e2f2eff9e1982cd6f46ba.jpg', 'No mood to eat, too much assignment liao'),
    ('Alice Iris X', 'irisx_123', '123456', 'irisx@example.com', 'https://i.pinimg.com/736x/da/fb/a7/dafba77ea91c88b9ab8569728dd78765.jpg', 'Focus on life, let fate handle the rest!'),
    ('Ah Huat', 'huat_888', '123456', 'huatah@example.com', 'https://cdn.pixabay.com/photo/2013/12/08/12/12/bitcoin-225079_640.png', 'Join Me and Earn Big Money'),
    ('Lee Wei Sen', 'ws_666', '123456', 'weisen@example.com', 'https://play-lh.googleusercontent.com/8OkZHhe9B39oVMR6K1nYJXfWn6lbmlb9yUEYJr3ULgF0ZiI5ZEmq_AIJncsvscoXCh0=w1052-h592-rw', 'Haha single dog!'),
    ('Xin Lin', 'xl_404', '123456', 'xl@example.com', 'https://i.pinimg.com/736x/e1/dd/0d/e1dd0d396d7b259fe6162c9e94d4dd23.jpg', 'I love my girlfriend very much'),
    ('Fui Yi Qi', 'vegepizza_222', '123456', 'yiqi@example.com', 'https://i.pinimg.com/736x/14/36/91/143691015745147f8dbbf9761b4841a9.jpg', 'No vegetable to eat'),
    ('Gor Gor', 'gg_69', '123456', 'gg@example.com', 'https://i.pinimg.com/736x/6e/0d/9d/6e0d9dcc316719aa8be3134ac89d532b.jpg', 'GG sia'),
    ('Yap Yee Qi', 'yyeeqii_88', '123456', 'yeeqi@example.com', 'https://i.pinimg.com/736x/6f/2b/f7/6f2bf7c54fce6f9aaaea86334d304403.jpg', 'I am the GOD'),
    ('Stella Star', 'star_02', '123456', 'star@example.com', 'https://i.pinimg.com/736x/d3/8a/69/d38a690838a621af115f194f7e27253d.jpg', 'Never caught any shiny pokemon...'),
    ('Tan Pei Yan', 'py_666', '123456', 'peiyan@example.com', 'https://i.pinimg.com/736x/0c/88/4c/0c884cb576bb62013ebfdc085a1bb5f6.jpg', 'I am the GOAT'),
    ('Aunty See', 'kei_29', '123456', 'andy@example.com', 'https://i.pinimg.com/736x/b2/6c/23/b26c2353fde138b00d97691ed4636e36.jpg', 'Always forgot to pay my dinner'),
    
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
    (9, 1), (9, 2), (9, 8),
    (10, 1), (10, 2), (10, 11), (10, 12), (10, 13), (10, 14), (10, 15), (10, 16), (10, 17), (10, 18), (10, 19), (10, 20),
    (11, 1), (11, 3),           (11, 12), (11, 13), (11, 14), (11, 15), (11, 16), (11, 17), (11, 18), (11, 19), (11, 20),
    (12, 1), (12, 4), (12, 11),           (12, 13), (12, 14), (12, 15), (12, 16), (12, 17), (12, 18), (12, 19), (12, 20),
    (13, 1), (13, 5), (13, 11), (13, 12),           (13, 14), (13, 15), (13, 16), (13, 17), (13, 18), (13, 19), (13, 20),
    (14, 1), (14, 6), (14, 11), (14, 12), (14, 13),           (14, 15), (14, 16), (14, 17), (14, 18), (14, 19), (14, 20),
    (15, 1), (15, 7), (15, 11), (15, 12), (15, 13), (15, 14),           (15, 16), (15, 17), (15, 18), (15, 19), (15, 20),
    (16, 1), (16, 8), (16, 11), (16, 12), (16, 13), (16, 14), (16, 15),           (16, 17), (16, 18), (16, 19), (16, 20),
    (17, 1), (17, 9), (17, 11), (17, 12), (17, 13), (17, 14), (17, 15), (17, 16),           (17, 18), (17, 19), (17, 20),
    (18, 1), (18, 2), (18, 11), (18, 12), (18, 13), (18, 14), (18, 15), (18, 16), (18, 17),           (18, 19), (18, 20),
    (19, 1), (19, 3), (19, 11), (19, 12), (19, 13), (19, 14), (19, 15), (19, 16), (19, 17), (19, 18),           (19, 20),
    (20, 1), (20, 4), (20, 11), (20, 12), (20, 13), (20, 14), (20, 15), (20, 16), (20, 17), (20, 18), (20, 19),
])

cursor.executemany('''
    INSERT INTO posts (image, caption, created_at, user_id)
    VALUES (?, ?, ?, ?)
''', [
    ("https://static.myfigurecollection.net/upload/pictures/2012/10/19/544629.jpeg", "Matcha > Coffee. Change my mind.", "2025-03-28T10:15:00.000Z", 2),
    ("https://static.myfigurecollection.net/upload/pictures/2025/05/08/4400239.jpeg", "Bookstore vibes 📚", "2025-03-28T11:00:00.000Z", 3),
    ("https://static.myfigurecollection.net/upload/pictures/2016/06/09/1557922.jpeg", "Can I nap here forever?", "2025-03-28T12:45:00.000Z", 8),
    ("https://static.myfigurecollection.net/upload/pictures/2025/04/25/4385984.jpeg", "Sunset stroll 🌇", "2025-03-28T18:20:00.000Z", 4),
    ("https://static.myfigurecollection.net/upload/pictures/2025/04/22/4382375.jpeg", "Huh? What did I miss?", "2025-03-28T21:00:00.000Z", 5),
    ("https://i.pinimg.com/736x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg", "Attack on Titan isn't just an anime—it's an emotional rollercoaster that shattered my expectations. The pain, sacrifice, and brutal truths hit deep. Every twist left me speechless, every death unforgettable. Watching Eren journey, I felt rage, hope, despair—all at once. It made me question humanity, freedom, and destiny. I will never forget how AOT made me feel.", "2025-04-11T21:00:00.000Z", 10),
    ("https://i.pinimg.com/736x/08/1a/75/081a75e0b011c2f82470ebfa82691480.jpg", "Imagine how the future will be without invention of glasses", "2025-05-09T21:30:00.000Z", 11),
    ("https://i.pinimg.com/736x/73/63/38/73633859c3f017c2705cda636251dfef.jpg", "PM me if you're looking for legit ways to earn quick money online! Whether it's side hustles, freelance gigs, passive income tips, or easy cash-back apps — I got chu covered. No scams, just smart methods that actually work. Let us make that extra cash together 💸💬", "2025-04-28T21:00:00.000Z", 12),
    ("https://i.pinimg.com/736x/26/53/29/265329bdcbbd4313c3681e6c6fc4495a.jpg", "AOT has the saddest and best ending, change my mind", "2025-04-11T21:00:00.000Z", 13),
    ("https://i.pinimg.com/736x/04/a3/24/04a324d1915ca31d10d8b1f0776854b1.jpg", "Rock n Roll 😍", "2025-03-28T21:00:00.000Z", 14),
    ("https://i.pinimg.com/736x/e0/5e/72/e05e72224c6dc187d8f2bef8221046a1.jpg", "Plant vs Zombie 3 doko?", "2025-04-22T21:00:00.000Z", 15),
    ("https://i.pinimg.com/736x/c0/2e/6f/c02e6f90fd1154f8eb10c47d4704e899.jpg", "國漫賽高", "2025-04-26T21:00:00.000Z", 16),
    ("https://i.pinimg.com/736x/fc/c9/e8/fcc9e8671ae768867f51821051088919.jpg", "Hehe", "2025-04-28T21:00:00.000Z", 17),
    ("https://i.pinimg.com/736x/b0/4c/f8/b04cf8eaafd1cef5922dd44beacc64fd.jpg", "The star is so bright, cute cat too!", "2025-05-09T21:00:00.000Z", 18),
    ("https://i.pinimg.com/736x/e1/90/ed/e190eddd33ad812bef2694ad94665f3d.jpg", "SPY x Family is goated, must watch", "2025-05-04T21:00:00.000Z", 19),
    ("https://i.pinimg.com/736x/d8/00/7a/d8007a2bfdce6b9798d95944fca95b14.jpg", "Most favourite music tape 10/10 ✨✨", "2025-05-08T21:00:00.000Z", 20),
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
    ("2025-03-28T21:13:00.000Z", 5, 3),
    ("2025-05-10T16:00:00.000Z", 6, 11),
    ("2025-05-10T16:02:00.000Z", 6, 12),
    ("2025-05-10T16:06:00.000Z", 6, 13),
    ("2025-05-10T16:10:00.000Z", 6, 15),
    ("2025-05-10T16:16:00.000Z", 6, 17),
    ("2025-05-10T16:20:00.000Z", 9, 11),
    ("2025-05-10T16:21:00.000Z", 9, 13),
    ("2025-05-10T16:24:00.000Z", 9, 14),
    ("2025-05-10T16:28:00.000Z", 9, 20),
    ("2025-05-10T16:44:00.000Z", 16, 3),
    ("2025-05-10T16:49:00.000Z", 16, 8),
    ("2025-05-10T16:51:00.000Z", 16, 5),
    ("2025-05-10T16:55:00.000Z", 16, 6),
    ("2025-05-10T16:59:00.000Z", 13, 2),
    ("2025-05-10T17:05:00.000Z", 10, 20),
    ("2025-05-10T17:08:00.000Z", 10, 3),
    ("2025-05-10T17:28:00.000Z", 10, 7),
    ("2025-05-10T17:30:00.000Z", 11, 5),
    ("2025-05-10T17:33:00.000Z", 11, 11),
    ("2025-05-10T17:36:00.000Z", 11, 16),
    ("2025-05-10T17:37:00.000Z", 15, 6),
    ("2025-05-10T17:38:00.000Z", 15, 11),
    ("2025-05-10T17:39:00.000Z", 15, 8),
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
    ("So aesthetic!", "2025-03-28T18:26:00.000Z", 4, 2),
    ("I love this tape too!!!", "2025-05-10T16:26:00.000Z", 16, 14),
    ("Nah overated", "2025-05-10T16:29:00.000Z", 9, 20),
    ("Ya its overated", "2025-05-10T16:33:00.000Z", 9, 19),
    ("Wlao scam siaa", "2025-05-10T16:38:00.000Z", 8, 7),
    ("Already PM you", "2025-05-10T16:39:00.000Z", 8, 9),
    ("Who would fall for this?", "2025-05-10T16:41:00.000Z", 8, 15),
    ("Lemme call the police on this...", "2025-05-10T16:47:00.000Z", 8, 13),
    ("ANIME IS THE BEST", "2025-05-10T16:55:00.000Z", 12, 19),
    ("Ngl chinese animation is getting better and better these days", "2025-05-10T17:00:00.000Z", 12, 13),
    ("Hehe", "2025-05-10T17:00:00.000Z", 13, 17),
    ("Hehe", "2025-05-10T17:06:00.000Z", 13, 18),
    ("Hehe", "2025-05-10T17:09:00.000Z", 13, 19),
    ("Hehe", "2025-05-10T17:11:00.000Z", 13, 16),
    ("Hehe", "2025-05-10T17:14:00.000Z", 13, 15),
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
