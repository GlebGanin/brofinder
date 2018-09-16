// load the things we need
var mysql = require("mysql");
var express = require('express');
var app = express();
var router = express.Router();

var session = require('express-session');
//allow sessions SETS A TIMER FOR HOW LONG THE SESSION WILL STAY ACTIVE:
app.use(session({ secret: 'app', cookie: { maxAge: 1*1000*60*60*24*365}}));


var bodyParser = require('body-parser');

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

var connection = mysql.createConnection({
	host: "localhost",
  
	// Your port; if not 3306
	port: 3306,
  
	// Your username
	user: "root",
  
	// Your password
	password: "gleb123",
	database: "brofinder_db"
  });



// INDEX PAGE
app.get('/', function(req, res) {
	res.render('pages/index');
});



//NEW USER SIGNUP PAGE
app.get('/signup', function(req, res){
	res.render('pages/signup');
});

// ADDING A NEW USER TO MYSQL
app.post('/new_user', function(req, res){
		
	var query = connection.query(
	"INSERT INTO users SET ?",
	req.body,
	function(error, response, fields) {
		if (error) throw error;
		console.log(req.body);

		session.user_name = req.body.name 
		session.email = req.body.email 
		session.password = req.body.password 

		console.log(session.email);

		res.redirect('/login');
	}
	);
})



//LOGIN TO YOUR WISHLIST
app.get('/login', function(req, res){
	res.render('pages/login')
})

app.post('/login', function(req, res){
	// res.json(req.body)
	connection.query('SELECT * FROM users WHERE email = ? and password = ?', 
	[req.body.email, req.body.password], function (error, results, fields) {
	if (error) throw error;
	
	session.user_id = results[0].id;
	session.user_name = results[0].name;
	session.email = req.body.email;
	session.password = req.body.password;
	
	user_id = session.user_id;
	user_name = session.user_name;
	email = session.email;
	password = session.password;

	console.log(user_id);

	// console.log(results[0].name);
	// console.log(session.email);
	// console.log(user_name);
		// connection.query('SELECT * FROM users WHERE email = ? and password = ?', 
		// [email, password], function (error, results, fields) {

		// req.session.user_name = results[0].name;
		// user_name = req.session.user_name

		// console.log(user_name);
		// });
	
	res.redirect('/homepage');
	});
});

//ACCOUNT HOMEPAGE
app.get('/homepage', function(req, res){
	user_name = session.user_name;
	res.render('pages/homepage')
})

//ACCOUNT DETAILS HOMEPAGE
app.get('/homepage_details', function(req, res){
	user_name = session.user_name;
	email = session.email;
	password = session.password;
	res.render('pages/homepage_details');
});



//BRO SURVEY PAGE
app.get('/survey', function(req, res){
	console.log(session.user_id)
	res.render('pages/survey');
});


app.post('/answer_survey', function(req, res){
	user_id = session.user_id 

	var query = "INSERT INTO answers (user_id, question1, question2, question3, question4 , question5, question6, question7, question8, question9, question10) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
	connection.query(query,[session.user_id, req.body.question1, req.body.question2, req.body.question3, req.body.question4, req.body.question5, req.body.question6, req.body.question7, req.body.question8, req.body.question9, req.body.question10],
	function(error, response, fields) {
		if (error) throw error;
	
			session.answer_id = response.insertId;

			session.question1 = req.body.question1;
			session.question2 = req.body.question2;
			session.question3 = req.body.question3;
			session.question4 = req.body.question4;
			session.question5 = req.body.question5;
			session.question6 = req.body.question6;
			session.question7 = req.body.question7;
			session.question8 = req.body.question8;
			session.question9 = req.body.question9;
			session.question10 = req.body.question10;

			connection.query('UPDATE users SET users.answer_id = ? WHERE id = ?', 
			[session.answer_id, session.user_id], function (error, results, fields) {
			if (error) throw error;
			});

	});
	// 	req.session.email = req.body.email 
	// 	console.log(req.session.email);
		res.redirect('/homepage_answered');
	// }
	// );
});


app.get('/homepage_answered', function(req, res){

	var bestMatch = session.bestMatch

	var user_id = (session.user_id - 1)

	connection.query('SELECT id, name, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 FROM users LEFT JOIN answers ON users.answer_id = answers.answer_id WHERE id = ?',
	[session.user_id],function (error, results2, fields) {
	if (error) throw error;

	you = results2[0]

			connection.query('SELECT id, name, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 FROM users LEFT JOIN answers ON users.answer_id = answers.answer_id WHERE id <> ?',
			[session.user_id], function (error, results, fields) {
			if (error) throw error;


	var bestMatchedUser;
	var lowestVariance = 1000;
	
	for (var i=0; i<results.length; i++){

				calc = Math.abs(you.question1 - results[i].question1);
				calc2 = Math.abs(you.question2 - results[i].question2);
				calc3 = Math.abs(you.question3 - results[i].question3);
				calc4 = Math.abs(you.question4 - results[i].question4);
				calc5 = Math.abs(you.question5 - results[i].question5);
				calc6 = Math.abs(you.question6 - results[i].question6);
				calc7 = Math.abs(you.question7 - results[i].question7);
				calc8 = Math.abs(you.question8 - results[i].question8);
				calc9 = Math.abs(you.question9 - results[i].question9);
				calc10 = Math.abs(you.question10 - results[i].question10);

				variance = (calc + calc2 + calc3 + calc4 + calc5 + calc6 + calc7 + calc8 + calc9 + calc10);

						if (variance < lowestVariance) {
							lowestVariance = variance;
							bestMatchedUser = (i + 1);
						}

		}

		session.bestMatch = results[(bestMatchedUser - 1)].name;
		session.bestMatch_id = results[(bestMatchedUser - 1)].id;

		console.log(session.bestMatch_id);
});
});


	res.render('pages/homepage_answered');
});



app.get('/review_survey', function(req, res){
	question1 = session.question1 
	question2 = session.question2 
	question3 = session.question3 
	question4 = session.question4 
	question5 = session.question5 
	question6 = session.question6 
	question7 = session.question7 
	question8 = session.question8 
	question9 = session.question9 
	question10 = session.question10
	res.render('pages/review_survey');
});



app.get('/find_match', function(req, res){
	bestmatch = session.bestMatch;
	bestmatch_id = session.bestMatch_id;

	connection.query('SELECT * FROM users WHERE id = ?', 
	[bestmatch_id], function (error, results, fields) {
	if (error) throw error;

	session.bestmatch_email = results[0].email;

	});
	res.render('pages/find_match');
});


app.get('/match_details', function(req, res){
	bestmatch_email = session.bestmatch_email;
	res.render('pages//match_details');
});





app.listen(3000);












