# CricFeed

A one stop place where you can find all the major insights of previous IPL events. [Cricfeed](https://cricfeed.netlify.com/) provides you with a robust dashboard where you can analyse past performance of IPL


### Snapshots
<img width="960" alt="image" src="https://user-images.githubusercontent.com/48097586/178133610-d5f6bc01-009f-4822-beab-2598e39de9e8.png">

<img width="960" alt="image" src="https://user-images.githubusercontent.com/48097586/178133626-e08aefde-ea7f-48dc-acf6-53ddecaab03a.png">

### Technologies used
- [React.js](https://reactjs.org/), UI framework
- [Papaparse](https://www.papaparse.com/), parsing `.csv` files to `.json` files
- [Chart.js](https://www.chartjs.org/), creating charts
- [Shinobi UI](https://shinobi-ui.netlify.app/), my own CSS Component Library

### Dataset
- [Kaggle IPL data](https://www.kaggle.com/datasets/harsha547/indian-premier-league-csv-dataset)

### Features
- Toggle Dark mode
- Full Screen support
- Beautiful and interactive charts
- Responsive
- Progressive Web App (PWA) support as per [Lighthouse report](https://developers.google.com/web/tools/lighthouse/)
- Works offline


### Explanation
- UI is designed with the help of React, I used React as I've been working with React for 1 year now and I'm quite confident in it and not because I don't like Vue / Angular. I am very keen to learn new technologies and there's no exception for Vue / Angular
- Papaparse is a very popular and light weight tool for parsing `.csv` files and thus making it developer friendly to work with.
- I've use my own component library for styling,as it is light weight, faster and does not require additional dependency to be installed. I've also made the app fully responsive to tackle almost every device.
- It has PWA support so it is also usable offline.

### Thought Process
- Firstly, I created a mock design on paper to decide how would Cricfeed look like. I had multiple designs sketched but I decided to go with the following as it looked cleaner. 
> PS: It's just a basic Lo-Fi
<p align='center'>
<img src='https://user-images.githubusercontent.com/48097586/178134273-001e258e-ead0-44d5-b4f4-2d41cff15c1a.png' width='400' />
</p>

- I thoroughly analysed the dataset and noted down what type of visualisation I want for inspiration I also looked at various visualisation Notebboks on Kaggle and decided to go with shown 8 charts
- To maximize the dashboard experience I've also added full screen mode so that the dashboard can be viewed in full screen and improving user experience
- There are many charting libraries available for React like Victory, Nivo, Recharts, etc. But I decided to go with Chart.js solely because of time constraint.
- Initially, I was confused about a way to handle `.csv` files, but then after researching a lot I found papaparse (a npm package) which allowed to parse `.csv` => `.json` which made it easy for me to work with data files.
- I tried to keep the dashboard as simple and as robust as possible

### Notable Future Features
- Most runs scored by an individual
- Most wickets taken by an individual
- Most IPL winning teams
- Store the files in database for better control and faster retrieval of data
