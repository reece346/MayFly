describe('Home screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('"Submit" button should be visible', async () => {
      await expect(element(by.id('SubmitButton'))).toBeVisible();
    });
  
    it('navigates to home screen after submit is clicked', async () => {
      await element(by.id('SubmitButton')).tap();
      await expect(RootNavigation.navigate("HomeScreen"));
    });
  });