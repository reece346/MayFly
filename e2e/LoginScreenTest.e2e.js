import * as RootNavigation from '../RootNavigation';

describe('Logout', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('"Submit" button should be visible', async () => {
      await expect(element(by.id('submitButton'))).toBeVisible();
    });
  
    it('navigates to Home Screen after submit', async () => {
      await element(by.id('submitButton')).tap();
      await expect(RootNavigation.navigate("HomeScreen"));
    });
  });