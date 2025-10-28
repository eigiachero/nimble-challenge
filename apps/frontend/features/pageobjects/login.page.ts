import { $ } from '@wdio/globals'
import Page from './page.js'

class LoginPage extends Page {
  public get inputUsername () {
    return $('#login-username')
  }

  public get inputPassword () {
    return $('#login-password')
  }

  public get btnSubmit () {
    return $('button[type="submit"]')
  }

  public getErrorMessage () {
    return $('//div[1]/span')
  }

  public getPageHeader () {
    return $('#login-title')
  }

  public async login (username: string, password: string) {
    await this.inputUsername.setValue(username)
    await this.inputPassword.setValue(password)
    await this.btnSubmit.click()
  }

  public open () {
    return super.open('login')
  }
}

export default new LoginPage()
