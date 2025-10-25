import { Given, When, Then } from '@wdio/cucumber-framework'

import LoginPage from '../pageobjects/login.page.js'
import chatPage from 'features/pageobjects/chat.page.js'

Given('I am on the login page', async () => {
  await LoginPage.open()
})

When('I login with {string} and {string}', async (username, password) => {
  await LoginPage.login(username, password)
})

Then('I should be redirected to the Chat page', async () => {
  await chatPage.getPageHeader().isDisplayed()
})

