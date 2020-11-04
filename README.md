# Project #2 Chatter Ladder


## **Table of Contents** 

  - [Description](#description)
  - [Elements](#elements)
  - [Installation Instructions](#installation)
  - [Usage](#usage)
  - [Contributors](#contributors)
  - [Aids](#aids)
  - [Tests](#tests)
  - [Questions](#questons)
  - [License](#license)


## **Description**
For this Project we built a chat app. We included a registration page, a login page, a home page that allowed you to enter different chat rooms, an "add chat room" page, and the chatroom pages. 

## **Elements**
Registration:
For the registration section of our app we created a database table that included the users first name, username, password, created-at, and updated-at. The information that    the user logs into the site become an object that is then connected into the database.
The password includes security meassures and must be at least 8 characters, with upper case and lower case letters, and must include at least one number.
<img src="/docs/img/Login.png"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />
Login:
For login the information that the user logged in registration is pulled when the user tries to log in. The username and password are checked against the database and if they are not in the database they are asked to create an account.
Home Page:
Once logged in the user is directed to the home page. Here we have all of the chatrooms that are currently created. We also have an add chat button. The add chat button connects you to the add chat room. The home page is pulling the room names from the second database table. The ROOM table includes id, roomname, and createdAt columns.
Add Room:
The Add Room page similar to the Home Page pulls from the ROOM table. When the user hits submit on the new chatroom the new room enters the table and appears on the home page. The user is then redirected into the chatroom
Chatroom:
The chatroom is connected to our third table. chatlogs. In this table we are logging id, username, message, and created at. Username is a foreign key as it is connected back to the USERS table.

## **Installation Instructions**
You can install express, mysql, and body-parser via the terminal or gitbash
  npm install express
  npm install mysql
  npm install body-parser
  
## **Usage**
NO CLUE!

## **DEMO**
[![video]()](https://drive.google.com/file/d/1A95aZWh2tCSKExeHcIjiwxZkWDtDSDuS/view?usp=sharing "Demo")

## **Contributors**
This project was done by:
Brooklyn Minor -- https://github.com/brooklynminor
Leah O'Gorman -- https://github.com/leahogorman
Ryan Browne -- https://github.com/ryanbrowne360
Sajal Karkee -- https://github.com/skar45
Victor Scherman -- https://github.com/vicscherman

## **Aids**
This project was done with a lot of research into socket.io
https://socket.io/
additional research was done by searching w3schools and stackoverflow
https://www.w3schools.com/
https://stackoverflow.com/
Additionally the project was done with aid from our instructors
Fil -- https://github.com/c0dehot
Daniel Ceballos -- https://github.com/shibeknight

## **Links**
Locally our project can run on http://localhost:3000
The Heroku live link is https://stark-springs-75145.herokuapp.com/index.html
The Github link is https://github.com/skar45/Project-2

