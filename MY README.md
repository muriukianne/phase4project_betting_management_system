#  PHASE 4 PROJECT - Betting Management System
### Date - 2/2/2025
### By Anne Muriuki
## Description
The Betting Management System is designed to allow users to efficiently manage their bets, track their betting history, and securely authenticate using their accounts. The system supports essential user operations such as registration, login, placing bets, viewing betting history, and managing bets through CRUD operations. The system tracks which user placed a specific bet and provides a history of their bets, ensuring streamlined and organized management of betting activities.

## Problem Statement
Managing bets and user information manually can become cumbersome and prone to errors. Many users rely on outdated methods to handle their betting activities, leading to:

* Data Redundancy and Errors: Users may face difficulties in tracking their bets, outcomes, and balances.
* Difficulty in Managing Users: Manual account management can lead to unauthorized access or lost information.

## Proposed Solution
The Betting Management System that will help users effectively manage their accounts, place bets, and view/manage their betting activities with the following features:

* Structured Data Management: Centralized management for users and their bets, ensuring a clear and organized relationship between users and their placed bets.
* CRUD Operations: Easy-to-use functionalities to create, view, update, and delete bets while managing user accounts.
* Authentication: Secure user registration, login, and session management to enhance user security.

## Features
## User Authentication
* Registration: Users can create new accounts by providing a username and password.
* Login/Logout: Users can log in and out of the system, ensuring they are authenticated before accessing their betting data.
* Password Security: User passwords are stored securely using encryption and password hashing.

## Bet Management
* Place a Bet: Users can place a new bet, specifying the outcome and amount they wish to wager.
* View Bets: Users can view all their placed bets along with their current status.
* Bet History: Users can view the history of all their past bets, including the outcome of each.

## CRUD Operations
* Create: Users can create new accounts, place bets, and manage their betting activities.
* Read: Users can view their account details and betting history.
* Update: Users can update their bet information before the outcome is determined.
* Delete: Users can delete their bets if they wish to cancel them.

## Technologies Used
### Backend
* Python
* Flask/Django
* JWT (JSON Web Tokens)
### Frontend
* React
* CSS/HTML
* React Toastify
### Authentication and Security
* JWT (JSON Web Tokens)

## Future Plans
* Mobile App Development
* Goal: Develop a mobile version of the Betting Management System to enhance accessibility and user experience.



