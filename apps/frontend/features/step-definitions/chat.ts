import { Given, Then } from '@wdio/cucumber-framework'
import assert from 'assert'
import chatPage from 'features/pageobjects/chat.page'
import loginPage from 'features/pageobjects/login.page'
import navbar from 'features/pageobjects/navbar'
import { browser } from '@wdio/globals'

Given('I am on the chat page', async () => {
  await chatPage.open()
  const loggedIn = await navbar.isLoggedIn()
  if (!loggedIn) {
    await loginPage.open()
    await loginPage.login('test', 'test123')
  }
})

Then('I should see the chat messages', async () => {
  const chatMessage = await chatPage.getFirstChatMessage()
  await chatMessage.isDisplayed()

  const text = await chatMessage.getText()
  assert.equal(text, 'This is a test message')
})

Then('I should see other person messages in the chat history', async () => {
  const otherPersonMessageUsername = await chatPage.getMessageUsername()
  await otherPersonMessageUsername.isDisplayed()

  const text = await otherPersonMessageUsername.getText()
  assert.equal(text, 'test2')
})

Then('I send a message with text {string} to the chat', async (message: string) => {
  await chatPage.sendMessage(message)
})

Then('I should see the message with text {string} in the chat', async (message: string) => {
  await browser.pause(300)
  const chatMessage = await chatPage.getLastChatMessage()
  const text = await chatMessage.getText()
  assert.equal(text, message)
})

