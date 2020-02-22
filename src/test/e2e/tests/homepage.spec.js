import landingPage from '../page-object/landingpage';
import TestData from '../utils/constants';
import { Selector as $ } from 'testcafe';

fixture `Validation for the scenarios on Homepage`
    .page`${landingPage.goto()}`


test('Scroll to Arrays challenge on clicking the Render button', async t => {

    await landingPage.clickRenderButton();
    await t.expect($(landingPage.selectors.submitAnswersButton).visible).ok();
});


test('Successfull submission of Arrays Challenge', async t => {
    await landingPage.clickRenderButton();

    let data = await landingPage.extractDataFromUITable();

    for (let i = 0; i < data.length; i++) {
        let extractArray = data[i].map(Number);
        let indexValue = await landingPage.findIndex(extractArray);
        await landingPage.inputValues(i, indexValue.toString());
    }
    await landingPage.inputName('k');
    await landingPage.submitAnswers();
    await t.expect($(landingPage.selectors.dialogBox).innerText).contains(TestData.assertions.successfulChallengeText);
});

test('Unsuccessful submission of Arrays Challenge', async t => {
    await landingPage.clickRenderButton();

    let data = await landingPage.extractDataFromUITable();

    for (let i = 0; i < data.length; i++) {
        await landingPage.inputValues(i, '2');
    }
    await landingPage.inputName('k');
    await landingPage.submitAnswers();
    await t.expect($(landingPage.selectors.dialogBox).innerText).contains(TestData.assertions.unsuccessfulChallengeText);
});
