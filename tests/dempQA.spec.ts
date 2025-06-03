import { chromium, expect,test } from "@playwright/test";

test('navigate to demo QA',async({browser})=>{
    const cont = await browser.newContext();
    const page = await cont.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
page.context
await page.goto('https://demoqa.com/');

await page.locator('//h5[contains(text(),"Alerts, Frame & Windows")]').click();
await page.locator('//span[contains(text(),"Alerts")]').click();
page.on('dialog',async(dialog)=>{
    console.log(`Dialog detected: ${dialog.message()}`);
    await dialog.accept();
});
await page.locator('#alertButton').first().click();

});

test('Example Test', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    expect(await page.title()).toBe('DEMOQA');
    await page.locator('//h5[contains(text(),"Alerts, Frame & Windows")]').click();
    await page.locator('//span[contains(text(),"Frames")]').first().click();
    const frame= page.frameLocator('#frame1');
    const text =await frame.locator('h1').innerText();
    console.log(`Extracted Text: ${text}`);
    
});
