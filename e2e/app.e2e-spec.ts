import { AHVLetterBuilderPage } from './app.po';

describe('ahvletter-builder App', () => {
  let page: AHVLetterBuilderPage;

  beforeEach(() => {
    page = new AHVLetterBuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
