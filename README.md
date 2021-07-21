

# Time Sheet Application


## Project:
* Implement a simple sign in / registration page. Password stored in the database should be
encrypted. You are also expected to implement some sort of security (JWT, session cookies
etc.) for authentication.
* Upon logging in, user are greeted with a calendar view to immediately see their daily
timesheet status (pending or complete).
* By default, the status for all the days in a year is ‘pending’.
* By clicking on a particular date on the calendar, user is able to view the details of that
particular day & is able to add, edit or delete posts on that day.
* A post, contains a description of the work done on that day & the number of hours.
* 1 day can have more than 1 post.
* Total number of hours from posts should not exceed 24 hours.
* If the total number of hours from posts is 8 hours or more, the status should change from
pending to complete.
* Half-day button. When clicking on this button, the “req_hour” will change from 8 to 4.
If hour is equal or greater than 4, the “status” should change from PENDING to COMPLETE
and the event displayed on the calendar should be updated.


## Setting up and running
### With Docker
1. Assuming `docker` and `docker-compose` are already installed in your local machine.
2. Clone the project.
3. Create .env file in the root directory. 
5. Set the PORT to 3001, TIME_SHEET_DB to a mongodb url (ex: <a href="https://www.mongodb.com/" target="_blank">Atlas MongoDB Documentation</a>),  TOKEN_AGE (Ex: 2592000000 = 30 days), SECRET_KEY (any value) and MAX_NUMBER_OF_TOKENS (can be set to 1) in your .env file.
6. Open the project diroctory in your terminal/command and run ➡️ `docker-compose build`
7. Run ➡️ `docker-compose up -d`
8. Go to your faviourte browser and visit this url `localhost`.

## CICD
### Architecture Diagram
![Alt text](./architecture-diagram.png?raw=true "Architecture Diagram")

## Technology / tools
- Node.js (Express Framwork)
- Nginx
- Angular 12
- Docker
- AWS (CodePipeline, Source Stage, CodeBuild, S3, ECS, Elastic Stalkbeans, Connect,)
- Angular-Calendar
- JWT
- MongoDB
- GitHub


## Author
<a href="https://linkedin.com/in/alihewiagh37" target="_blank">Ali Algmaty</a> – alihewaigh@gmail.com
