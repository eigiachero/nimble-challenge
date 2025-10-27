import { Given, Then, When } from '@wdio/cucumber-framework'
import assert from 'assert'
import chatPage from 'features/pageobjects/chat.page'
import homePage from 'features/pageobjects/home.page'
import loginPage from 'features/pageobjects/login.page'
import logoutPage from 'features/pageobjects/logout.page'

import navbar from 'features/pageobjects/navbar.js'
import registerPage from 'features/pageobjects/register.page'

Given('I am not logged in', async () => {
  const loggedIn = await navbar.isLoggedIn()
  if (loggedIn) {
    const logoutButton = await navbar.getLogoutButton()
    await logoutButton.click()
    const logoutPageButton = await logoutPage.getLogoutPageCTA()
    await logoutPageButton.click()
  }
  await homePage.open()
})

Given('I am logged in', async () => {
  const loggedIn = await navbar.isLoggedIn()
  if (!loggedIn) {
    await loginPage.open()
    await loginPage.login('test', 'test123')
  }
  await homePage.open()
})

Given('I am on the landing page', async () => {
  await homePage.open()
})

When('I click on the login CTA', async () => {
  await homePage.getLoginCTA().click()
})

When('I click on the register CTA', async () => {
  await homePage.getRegisterCTA().click()
})

Then('I should see the landing page', async () => {
  await homePage.getLandingTitle().isDisplayed()
  await homePage.getLoginCTA().isDisplayed()
  await homePage.getRegisterCTA().isDisplayed()
})

Then('I should see the chat page', async () => {
  await chatPage.getPageHeader().isDisplayed()
})

Then('I should be redirected to the login page', async () => {
  const header = await loginPage.getPageHeader()
  await header.isDisplayed()
  const headerText = await header.getText()
  assert.equal(headerText, 'Login')
})

Then('I should be redirected to the register page', async () => {
  await registerPage.getPageHeader().isDisplayed()
  const header = await registerPage.getPageHeader()
  await header.isDisplayed()
  const headerText = await header.getText()
  assert.equal(headerText, 'Register')
})