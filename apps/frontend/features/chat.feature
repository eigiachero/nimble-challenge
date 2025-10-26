Feature: Chat User Stories

  Scenario Outline: As a logged in user, I can see the chat message history
    Given I am on the chat page
    Then I should see the chat messages

  Scenario Outline: As a logged in user, I can see other person's messages in the chat history
    Given I am on the chat page
    Then I should see other person messages in the chat history

  Scenario Outline: As a logged in user, I can send a message to the chat and see it in the chat history
    Given I am on the chat page
    When I send a message with text "<message>" to the chat
    Then I should see the message with text "<message>" in the chat

    Examples:
      | message |
      | test    |
      | hello   |