
-- Users Mock Data
INSERT INTO Users (DiscordID, UserName, BlogURL)
VALUES 
('discord123', 'UserOne', 'http://bloguserone.com'),
('discord456', 'UserTwo', 'http://blogusertwo.com'),
('discord789', 'UserThree', 'http://bloguserthree.com');

-- StudyGroups Mock Data
INSERT INTO StudyGroups (GroupName, StartDate, EndDate, RuleDescription)
VALUES 
('Coding Group', '2023-01-01', '2023-12-31', 'Weekly coding challenges.'),
('Writing Group', '2023-02-01', '2023-12-31', 'Weekly writing tasks.');

-- BlogPosts Mock Data
INSERT INTO BlogPosts (UserID, GroupID, PostURL, PostDate)
VALUES 
(1, 1, 'http://bloguserone.com/post1', '2023-03-01'),
(2, 1, 'http://blogusertwo.com/post1', '2023-03-02'),
(3, 2, 'http://bloguserthree.com/post1', '2023-03-03');

-- Penalties Mock Data
INSERT INTO Penalties (UserID, Amount, DueDate, IsPaid)
VALUES 
(1, 100.00, '2023-04-01', false),
(2, 200.00, '2023-04-01', true);

-- Notifications Mock Data
INSERT INTO Notifications (UserID, GroupID, NotificationType, Message, SentDate)
VALUES 
(1, 1, 'Reminder', 'Remember to post your weekly blog!', '2023-03-01 10:00:00'),
(2, 1, 'Penalty', 'Penalty for not posting!', '2023-04-02 10:00:00');

-- Users_StudyGroups Mock Data
INSERT INTO Users_StudyGroups (UserID, GroupID)
VALUES 
(1, 1),
(2, 1),
(3, 2);
