# Where's Waldo

This is a simple Where's Waldo game built with a Ruby on Rails backend and a React frontend.

The game can be played at https://where-s-waldo.fly.dev.

As this is a demo of the website, the production database uses postgreSQ and I have not attached any fly volumes to my fly machine, meaning leaderboard scores will not persist. 

## Features

### Single Page Application (SPA) 
The React frontend is mounted into the Rails layout view after the turbo:load event, enabling seamless client-side navigation within a Rails-delivered page

### Screen-adaptable character detection
 - the algorithm used to determine whether the player has correctly selected a character's location is designed to be screen-size agnostic, ensuring consistent behavior across different resolutions and devices
 - **How this works:**
    - each character’s position is stored as normalized coordinates (values between 0 and 1) in the database
    - when the player makes a guess, the frontend sends the bounding rectangle of the play area (DOMRect) along with the pixel coordinates of the user’s click to the backend
    - the backend uses these inputs in an instance method of the Coordinate model to convert the normalized coordinates into pixel values relative to the play area, then checks whether the click falls within a 2% margin around the target location

### Time Tracking
- **UI Timer**
  - An `elapsedTime` state handles the ticking of the UI timer for the player.

- **Session Based Timer**
  - on initial load of the Image component, a call is made to the backend to record the time at the start of the game in session storage 
  - when the game is won, the TargettingBox component sends a call to record the time at the game's end

### Leaderboard Integration
  - the leaderboard relies on the times stored in the session storage to save scores, mitigating potential score tampering 

### Playing it locally:
1. Clone the project  
2. Run `bundle install`  
3. Run `npm install`  
4. Run `rails db:create db:migrate db:seed`  
5. Run `bin/dev` to start the development server  
