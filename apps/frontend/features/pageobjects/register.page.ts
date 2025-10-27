import { $ } from '@wdio/globals'
import Page from './page.js'

class RegisterPage extends Page {
  public getPageHeader () {
    return $('//h1')
  }

  public open () {
    return super.open('register')
  }
}

export default new RegisterPage()
