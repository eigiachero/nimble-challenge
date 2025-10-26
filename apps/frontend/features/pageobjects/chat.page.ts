import { $, $$ } from '@wdio/globals'
import Page from './page.js'

class ChatPage extends Page {

  public get messageInput () {
    return $('#message-input')
  }

  public get sendMessageButton () {
    return $('#send-message-button')
  }

  public getMessageUsername () {
    return $('//p[@data-testid="message-username"]')
  }

  public getPageHeader () {
    return $('//div/h1[text()="General Chat"]')
  }

  public getFirstChatMessage () {
    return $('//span[@data-testid="message-content"]')
  }

  public async getLastChatMessage () {
    const chatMessages = await $$('//span[@data-testid="message-content"]')

    return chatMessages[chatMessages.length - 1]
  }

  public async sendMessage (message: string) {
    await this.messageInput.waitForDisplayed()
    this.messageInput.setValue(message)

    await this.sendMessageButton.waitForClickable()
    this.sendMessageButton.click()
  }

  public open () {
    return super.open('chat')
  }
}

export default new ChatPage()
