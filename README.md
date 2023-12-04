# CITY LIMITS

CITY LIMITS is a web application for users to see what events are happening around their same zip code. 

## Description

The user can create their own account that will be personalized to them. The user can also create their own event that will be shared with other users within the same zip code as their event. The users event can be edited and/or deleted. The user can also edited their own personal information on their profile page. 

## Table of Contents

- Installation
- Usage
- Features
- Technologies Used
- Author

## Installation

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Clone the Repository

- git clone https://github.com/lea-breithaupt/eventProject
- cd event_project_1

### Set Up PostgreSQL Database

- psql -d events_all_around
- DB_NAME = events_all_around
- DB_HOST = localhost
- DB_PORT = 5050

### Install Dependencies and Start the Applicatiion

npm install
npm start
# or
yarn install
yarn start

## Usage

CITY LIMITS offers an intuitive way to engage with local events. Here's a step-by-step guide to using the application:

1. **Creating an Account:**
   - Navigate to the registration page and provide necessary details to create a personalized account.

2. **Logging In and Accessing Personalized Page:**
   - Use the registered credentials to log in and access the personalized main page.
   - The main page showcases events within the user's provided zip code.

3. **Creating an Event:**
   - On the main page, users can create events by specifying details like title, date, and description.

4. **Managing Created Events:**
   - Edit or delete created events as necessary to keep information up-to-date.

5. **Viewing and Editing Profile Information:**
   - Visit the profile page to view and update personal information.
   - Updating the zip code will reflect events from the updated location.

6. **Additional Features:**
   - Delete the user account, navigate to the main page via the City Limits logo, log out, and explore more functionalities available.

## Features

- Feature 1: The User can create their own account. 
- Feature 2: The User can Log in with their credentials. The User will be taken to their personalized main page where they can view the events that are happening within their zipcode that was provided by them when they created their account.
- Feature 3: The User can create their own event.
- Feature 4: The User can edit their event.
- Feature 5: The User can delete their event.
- Feature 6: The User can go to their profile page that will display all of their personal information provided with they createdt their account.
- Feature 7: The User can edit their personal information. If the user edits their first name it will re-render on the main page. If the user edits their zipcode it will re-render the events displayed on the main page to be events happening within the updated zip code. 
- Feature 8: The User can delete their account.
- Feature 9: The User can click on the City Limits logo to go to the User's main page. 
- Feature 10: The User can log out of their account. 

## Technologies Used

- React.js
- PostgresSQL
- Sequelize
- Redux
- Axios
- Bootstrap
- CSS

## Author

Lea White