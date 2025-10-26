import { Given, When, Then } from '@wdio/cucumber-framework'

import loginPage from '../pageobjects/login.page.js'
import chatPage from 'features/pageobjects/chat.page.js'
import assert from 'assert'
import navbar from 'features/pageobjects/navbar.js'
import logoutPage from 'features/pageobjects/logout.page.js'
import homePage from 'features/pageobjects/home.page.js'

Given('I am on the login page', async () => {
  const loggedIn = await navbar.isLoggedIn()
  if (loggedIn) {
    await navbar.removeLoginCookies()
  }
  await loginPage.open()
})

When('I login with {string} and {string}', async (username, password) => {
  await loginPage.login(username, password)
})

Then('I should be redirected to the Chat page', async () => {
  await chatPage.getPageHeader().isDisplayed()
})

Then('I should see an error message {string}', async (message) => {
  const errorMessage = await loginPage.getErrorMessage()

  await errorMessage.isDisplayed()
  const text = await errorMessage.getText()
  assert.equal(text, message)
})

When('I click on the navbar logout button', async () => {
  const logoutButton = await navbar.getLogoutButton()
  await logoutButton.click()
})

Then('I should be redirected to the logout page', async () => {
  await logoutPage.getLogoutTitle().isDisplayed()
})

Then('I should be able to log out', async () => {
  const logoutPageCTA = await logoutPage.getLogoutPageCTA()
  await logoutPageCTA.click()
})

Then('I should be redirected to the home page', async () => {
  await homePage.getLandingTitle().isDisplayed()
})