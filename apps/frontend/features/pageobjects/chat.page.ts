import { $ } from '@wdio/globals'
import Page from './page.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ChatPage extends Page {
  /**
     * define selectors using getter methods
     */
  public getPageHeader () {
    return $('//div/h1[text()="General Chat"]')
  }

  /**
     * overwrite specific options to adapt it to page object
     */
  public open () {
    return super.open('chat')
  }
}

export default new ChatPage()
