const {Builder,By,Key} = require('selenium-webdriver');
async function test1() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {

            await driver.get('http://localhost:5173/#/broker/25');
            await driver.sleep(5000)
            let inputElement = await driver.findElement(By.name('count'));
            await inputElement.clear()
            await inputElement.sendKeys(1, Key.RETURN);
            let buyButton = await driver.findElement(By.id('2buy'))
            await buyButton.click()
            await driver.sleep(5000)
        } catch (e) {
            console.log(e)
        } finally {
            await driver.quit();
        }
}
async function test2() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {

            await driver.get('http://localhost:5173/#/broker/25');
            await driver.sleep(5000)
            let inputElement = await driver.findElement(By.name('count'));
            await inputElement.clear()
            await inputElement.sendKeys(1, Key.RETURN);
            let buyButton = await driver.findElement(By.id('2sell'))
            await buyButton.click()
            await driver.sleep(5000)
        } catch (e) {
            console.log(e)
        } finally {
            await driver.quit();
        }
}
async function test3() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        await driver.get('http://localhost:5173/#/broker/25');
        await driver.sleep(5000)
        let inputElement = await driver.findElement(By.name('count'));
        await inputElement.clear()
        await inputElement.sendKeys(100000000000, Key.RETURN);
        let buyButton = await driver.findElement(By.id('4sell'))
        await buyButton.click()
        let span = await driver.findElement(By.id('errorMessage'))
        let message = await span.getAttribute('innerHTML')
        if (message!=='Недостаточно акций для продажи')
            throw new Error(message)
        await driver.sleep(5000)
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
}
async function test4() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        await driver.get('http://localhost:5173/#/broker/25');
        await driver.sleep(5000)
        let inputElement = await driver.findElement(By.name('count'));
        await inputElement.clear()
        await inputElement.sendKeys(1000000, Key.RETURN);
        let buyButton = await driver.findElement(By.id('4buy'))
        await buyButton.click()
        let span = await driver.findElement(By.id('errorMessage'))
        let message = await span.getAttribute('innerHTML')
        if (message!=='Недостаточно денег для покупки')
            throw new Error(message)
        await driver.sleep(5000)
    } catch (e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
}
(async ()=>{
    // await test1()
    // await test2()
    // await test3()
    await test4()
})()