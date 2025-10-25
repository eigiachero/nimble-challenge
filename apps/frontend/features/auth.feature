Feature: Chat Authentication

  Scenario Outline: As a user, I can log into the chat with valid credentials

    Given I am on the login page
    When I login with "test" and "test123"
    Then I should be redirected to the Chat page
