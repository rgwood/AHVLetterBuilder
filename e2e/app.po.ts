import { browser, by, element } from 'protractor';

export class AHVLetterBuilderPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('letter-builder h1')).getText();
  }
}
