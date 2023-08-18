import { Locator} from "@playwright/test";
import { test, expect } from "../fixtures";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import {helpers} from "../helpers";


test.beforeEach(async ({ page }) => {
  test.slow();
  await page.goto("/");
});

test.afterEach(async ({page}, testInfo) => {
  await helpers.attachToReport(testInfo, await page.screenshot(), testInfo.title);
})

test("Connect wallet using an existing metamask account", async () => {
  await metamask.acceptAccess();
});

test("Checking the available amount dogs for adoption", async ({page}) => {
  test.slow();
  await metamask.acceptAccess();  
  const enabledAdoptButtons:Locator[] = await helpers.getEnabledAdoptButtons(page);
  expect(enabledAdoptButtons.length).toBeGreaterThan(1);
});


test("Reject an adpotion", async ({
  page,
}, testInfo) => {
  test.slow();
  await metamask.acceptAccess();  
  const enabledAdoptButtons:Locator[] = await helpers.getEnabledAdoptButtons(page);
  await enabledAdoptButtons[0].click();
  await metamask.rejectTransaction();
});

test("Confirm an adpotion", async ({
  page,
}, testInfo) => {
  test.slow();
  await metamask.acceptAccess();
  const enabledAdoptButtons:Locator[] = await helpers.getEnabledAdoptButtons(page);
  const firstEnabled = enabledAdoptButtons[0];
  await firstEnabled.click();
  const {
    recipientPublicAddress,
    networkName,
    customNonce,
    confirmed } = await metamask.confirmTransaction({
    gasLimit:21000,
    gasPrice:450000});

   expect(confirmed).toBeTruthy();  
});