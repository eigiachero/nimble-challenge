import { $ } from '@wdio/globals'
import Page from './page.js'

class RegisterPage extends Page {
  public getPageHeader () {
    return $('#register-title')
  }

  public open () {
    return super.open('register')
  }
}

export default new RegisterPage()
