Feature: Landing Stories

  Scenario Outline: As a new user, I can see the landing page
    Given I am not logged in
    And I am on the landing page
    Then I should see the landing page

  Scenario Outline: As a logged user, I can see the chat page instead of the landing page
    Given I am logged in
    And I am on the landing page
    Then I should see the chat page

  Scenario Outline: As a new user, I can click on the login CTA and be redirected to the login page
    Given I am not logged in
    When I click on the login CTA
    Then I should be redirected to the login page

  Scenario Outline: As a new user, I can click on the register CTA and be redirected to the register page
    Given I am not logged in
    When I click on the register CTA
    Then I should be redirected to the register page
