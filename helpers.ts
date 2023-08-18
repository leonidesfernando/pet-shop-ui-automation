import { Locator, Page, TestInfo } from "@playwright/test";

export const helpers = {
    async getEnabledAdoptButtons(page:Page): Promise<Locator[]> {
        const allAdoptButtons = await page.locator('button[data-id]');
        const allAdoptButtonsSize = await allAdoptButtons.count();
        const adoptDisabledButtons = await page.locator('button[data-id][disabled="disabled"]');
        const adoptDisabledButtonsSize = await adoptDisabledButtons.count();
      
        const adoptEnabledButtons:Locator[] = [];
        for(let i = 0; i < allAdoptButtonsSize; i++){
          const item = await allAdoptButtons.nth(i).getAttribute('data-id');
          let found = false;
          for(let j = 0; j < adoptDisabledButtonsSize; j++){
            const disabledItem = await adoptDisabledButtons.nth(j).getAttribute('data-id');
            if(disabledItem == item){
              found = true;
              break;
            }
          }
          if(!found){
            adoptEnabledButtons.push(allAdoptButtons.nth(i));
          }
        }
        return adoptEnabledButtons;
    },
    async attachToReport(testInfo:TestInfo, screenshot: Buffer, label:string = 'test\'s screenshot'): Promise<void>{
        testInfo.attach(label, {
            body: screenshot,
            contentType: 'image/png'
          });
        
    }
}
