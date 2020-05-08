# Techmate
 ### A webApp built on MERN stack
> Fork this repo to contribute to the project
## Requirements for `Version 2.0.0`
  > Integrating Chat features on this website \
  > Adding Blogs to the website \
  > Adding a feature of following users on Techmate to receive mails of projects added by them\
  > Bookmarking projects so that they become visible to me in my profile\
  > Redesigning of UI\
  > Adding notification bar\
  > Adding no of unread posts and project on sidebar

  ## Deploy on local machine
 
  
  
* ### Install [Node.js](https://nodejs.org/en/download/current/)
> Deploying this app requires node package manager `npm`
* ### Set [MongoDB](https://docs.mongodb.com/manual/installation/) Database
* ### Clone the repository
> Download this repository `or`
```
git clone https://github.com/jainpriyanshi/Techmate.git
cd Techmate
```
* ### Install dependencies for Backend
> Add email and password to mail.js in Backend
```
cd server && cd config 
touch mail.js
```
* ### Install dependencies for Backend
> Directory now is to be changed to `server`
```
cd server
npm install
```
* ### Run `development server`
```
npm start
```
> Its up and running on port 3000.

* ### Install dependencies for frontend
> Directory now is to be changed to `client`
```
cd client
npm install
```
* ### Run `development server`
```
npm start
```
> Its up and running on port 3001.

* ### Run `production build`
```
npm run build
```
