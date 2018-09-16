# BroFinder App 

On page load : the user is given the choice to either create a new account or login to an existing account.


Create New Account:
    The new user inputs basic information for their account including: their name, email and password. This information is stored into a SQL database table. Once the basic info is submitted the user is prompted to login.

Login : 
    The user provides their email address and password. The site retives their information from SQL and saves the uesr details to the sessions. The details will be saved until the session is terminated. The user is then redirected to their homepage where they have the choice to take the bro survey.

Survey:
    The survey consists of 10 statements that the user rates on a scale of 1-5. Using the dropdown menu you can select your answer for all 10 questions and then hit the submit button. The user is then taken back to their profile page where they are given the option to analyze their results and retrieve their closest bro companion. The user can also choose to review their survey answers and retake the survey if they wish.

Bro Companion: 
    The bro companion is calculatd by taking the answers to the 10 survey questions and comparing them to other user's answers that are stored in teh SQL database. The questions are compared 1 to 1 and the difference is added together. The bro with the smallest difference from you is then selected as yoru broifriend.

Contacting Bro:
    You are given the option to contact your broifriend if you wish to. By hitting the next button you will be redirected to a page that displays your broifriends email address so that you can bro down with them.

# I hope you enjoy using the app!