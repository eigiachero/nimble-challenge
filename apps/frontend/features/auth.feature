Feature: Chat Authentication Stories

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