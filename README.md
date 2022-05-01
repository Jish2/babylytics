# Babylytics

_By Joshua Goon and Rahul Rao_

> 🏆 Hackathon 1st Place Winner 🏆
> https://devpost.com/software/babylytics

![poster](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/920/347/datas/original.png)
[screenshot](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/920/338/datas/original.png)

### What it does

Babylytics uses Tensorflow trained on data from over 2,000 fetuses to predict the health of a fetus. Simply upload the data to our site where an API call is made, which returns the percent confidence of the health of the fetus.

### Inspiration

Every year, 21,000 infants die. Our team was inspired by this metric, hoping to prevent infant mortality one step at a time. We were also inspired by the UN’s third goal: Good Health and Well-being.

### How we built it

We built the front end in React, and the backend with FastAPI. We used tensorflow for our fetal health prediction.

### Challenges we ran into

We ran into challenges fetching post requests with CSV files. We used interesting methods to parse the data so the backend could interpret it.

### What we learned

Used to Express.js, we were forced to quickly learn FastAPI. We also learned a lot about training data with the SARIMA algorithm.

### Built With

- React.js
- Bootstrap
- FastAPI
- Tensorflow
