import { $ } from '@wdio/globals'
import Page from './page.js'

class LogoutPage extends Page {
  public getLogoutTitle () {
    return $('//div/h1[text()="Are you sure you want to log out?"]')
  }

  public getLogoutPageCTA () {
    return $('//button[text()="Log out"]')
  }

  public open () {
    return super.open('logout')
  }
}

export default new LogoutPage()
