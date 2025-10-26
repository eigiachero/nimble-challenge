import { $, browser } from '@wdio/globals'

class Navbar {
  public isLoggedIn () {
    const logoutButton = $('//nav/div/a[text()="Log out"]')

    return logoutButton.isExisting()
  }

  public async removeLoginCookies () {
    return browser.deleteCookies(['jwt-token'])
  }

  public async getLogoutButton () {
    return $('//nav/div/a[text()="Log out"]')
  }

}

export default new Navbar()
