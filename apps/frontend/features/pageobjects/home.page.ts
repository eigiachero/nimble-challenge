import { $ } from '@wdio/globals'
import Page from './page.js'

class HomePage extends Page {
  public getLandingTitle () {
    return $('//div/div[1]/h1')
  }

  public getLoginCTA () {
    return $('//a[text()="Sign In"]')
  }

  public getRegisterCTA () {
    return $('//a[text()="Get Started"]')
  }

  public open () {
    return super.open('home')
  }
}

export default new HomePage()
