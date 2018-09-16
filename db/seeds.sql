USE wishlist_db;

INSERT INTO users (answer_id, name, email, password)
VALUES (1,"Gleb Ganin", "gleb@trilogy.edu", "gleb"),
(2,"James Warren", "james@trilogy.edu", "james"),
(3,"Daniel Kolb", "daniel@trilogy.edu", "daniel"),
(4,"Mike Vedo", "vedo@trilogy.edu", "vedo"),
(5,"Dustin Dear", "dustin@trilogy.edu", "dustin"),
(6,"Brandon Bongar", "brandon@trilogy.edu", "brandon"),
(7,"Nick Fishwick", "fish@trilogy.edu", "nick"),
(8,"Kevin Gilmore", "gilmore@trilogy.edu", "kevin"),
(9,"Mike Seramin", "serm@trilogy.edu", "mike");



INSERT INTO answers (user_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10) 
VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5),
(3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
(4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
(5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2),
(6, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5),
(7, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1),
(8, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2),
(9, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5);



