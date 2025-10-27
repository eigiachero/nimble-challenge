Feature: Authentication Stories

  Scenario Outline: As a user, I cannot log into the chat with invalid password
    Given I am on the login page
    When I login with "test" and "invalid"
    Then I should see an error message "Incorrect username or password"

  Scenario Outline: As a user, I cannot log into the chat with invalid username and password
    Given I am on the login page
    When I login with "invalid" and "invalid"
    Then I should see an error message "Incorrect username or password"

  Scenario Outline: As a user, I can log into the chat with valid credentials
    Given I am on the login page
    When I login with "test" and "test123"
    Then I should be redirected to the Chat page

  Scenario Outline: As a user, I can log out of the chat
    Given I am on the chat page
    When I click on the navbar logout button
    Then I should be redirected to the logout page
    Then I should be able to log out
    Then I should be redirected to the home page

  Scenario Outline: As a user, I can register a new account with valid information

  Scenario Outline: As a user, I cannot register a new account with invalid information

  Scenario Outline: As a user, I cannot register a new account with not every required field

  Scenario Outline: As a user, I cannot register a new account with a username that already exists
