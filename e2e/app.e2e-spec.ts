import { SmpPage } from './app.po';

describe('smp App', function() {
  let page: SmpPage;

  beforeEach(() => {
    page = new SmpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
