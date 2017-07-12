import { TestingAdminPage } from './app.po';

describe('testing-admin App', () => {
  let page: TestingAdminPage;

  beforeEach(() => {
    page = new TestingAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
