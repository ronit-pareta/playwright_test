import { expect, Expect,test } from "@playwright/test";
import exp from "constants";
import path from "path";

test.beforeEach('navigate to login page',async ({page})=>{
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
    await expect(page).toHaveTitle('Your Store');
    const myAcc = page.locator('//a[@title="My Account"]');
    await myAcc.click();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('xyz121@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
});

test('search desktop',async({page})=>{
    const desk = page.getByRole('link',{name:'Desktops'});
    await desk.hover();
    await page.getByRole('link',{name:"Show All Desktops"}).click();
    const deskpage = page.getByRole('heading',{name:'Desktops'});
    await expect(deskpage).toHaveText('Desktops');
    const deskitems= page.locator('.product-thumb');
    await deskitems.filter({has: page.getByText('Canon EOS 5D Canon\'s press')}).click();
    await expect(page.getByAltText('Canon EOS 5D')).toBeVisible();
    
});
test('add HP Laptop',async({page})=>{
    const desk = page.getByRole('link',{name:'Desktops'});
    await desk.hover();
    await page.getByRole('link',{name:"Show All Desktops"}).click();
    await page.getByRole('link',{name:'HP LP3065'}).nth(1).click();
    await expect(page.getByRole('heading',{name:'HP LP3065'})).toBeVisible();
    await page.locator('#input-quantity').fill('2');
    await page.getByRole('button',{name:'Add to Cart'}).click();
    const success = page.locator('//div[contains(text(),"Success: You have added ")]');
    await expect(success).toContainText('Success: You have added ');
    await page.screenshot({path:'success.png'});
});
test.afterEach('clean up',async({page})=>{
await page.waitForTimeout(1000);

});

