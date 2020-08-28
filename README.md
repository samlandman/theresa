# Theresa

Enjoying a Walk Near You.

This was our final project as part of Makers Academy. We wanted to build a website where you can organise a trip and find walks to do on your trip. We included travel distance from a central location so that journey time can be estimated and walks populated that are in the local area. We also included the Weather API so that you could check the weather for the day based on which walk you wanted to go on on a specfic day.

The website can be found live on Heroku - https://cryptic-brook-48460.herokuapp.com/

Our Trello Board can be found here - https://trello.com/b/1bBOkh6L/theresa

## Install

Run the following commands to start the project for the first time
```
bundle install
rails db:migrate:reset
npm install
rails active_storage:install
rails db:migrate
```

After updates run
```
bundle install
npm install
```

Updating Heroku DB
It will update on its own if Circle CI passes. 

The command to update the database on Heroku is as follows:
```
heroku run rake db:migrate --app cryptic-brook-48460
```

### User Stories

#### Weather
As a parent who wants to take my family on a walk
So that I can choose a walk to do today
I would like to see a walk where we won’t get rained on

As a parent who wants to take my family on a walk
So that I can choose a walk to do today
I would like to see a walk where it will be sunny for the whole time

As a parent who wants to take my family out
So that I can choose a place to go to today
I would like to see a wholesome indoor activity if it is raining (museum?)

As a parent who wants to take my family out
So that I can choose a place to go to today
I would like to choose to see a free wholesome indoor activity if it is raining

#### Travel Distance

As a parent who wants to take my family on a walk
So that I can choose a new walk to do today
I would only like to see walks within x minutes of my home on public transport or car

As a parent who wants to take my family on a walk
So that I can choose a walk to do today
I would like to see a walk where we can by home by x o’clock

As a parent who wants to take my family on a walk
So that I can choose a suitable walk to do today
I would like to see how far and how long a walk will take (family walk takes longer?)

#### Information

As a parent who wants to take my family on a walk
So that I can find some more information
I would like to know the coordinates of the start of the walk, and a website for more information if possible

As a parent who wants to take my family on a walk
So that I can see what kind of walk it would be 
I would like to see a photo of the walk

### MVP (Minimum Viable Product) - Two Day Sprint

We spent the first two days aiming to deploy on Heroku the following MVP that could:

- Create a walk which can be shown on the map
- See all the walks that have been created on the map
- Show a circle of where you can get to within 1 hour shown on the map

### Model

To be inserted from the following link:

https://app.diagrams.net/?state=%7B%22ids%22:%5B%221Ljpxx8x9MdulFTPIjrjEQ0TcDtc09hDK%22%5D,%22action%22:%22open%22,%22userId%22:%22116151611041158069403%22%7D

### Testing
RSpec
`bundle exec rspec` to run local tests
`open coverage/index.html`

CircleCI
run `gem update --system` to get the error 
`find_spec_for_exe': Could not find 'bundler' (2.1.4)` to go?

Run webpage locally
`rails s` then go to localhost:3000

### Test Coverage

44.73% Test Coverage (This will be improved)

### Difficulties faced

- Travis CI
- Limitations on APIs
- Working as a team of 3 meaning difficult to pair

