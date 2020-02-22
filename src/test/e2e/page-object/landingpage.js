import { Selector as $, t } from 'testcafe';
import BasePage from './basepage';
import appSelectors from '../utils/selectors'

const LandingPage = {

    selectors: appSelectors,

    clickRenderButton: async function () {
        await t.click(appSelectors.renderButton);
    },

    inputValues: async function (iterator, value) {
        await t.typeText($(`[data-test-id="submit-${iterator + 1}"]`), value);
    },

    inputName: async function (value) {
        await t.typeText(appSelectors.submitButton4, value);
    },

    submitAnswers: async function () {
        await t.click(appSelectors.submitAnswersButton);
    }
}

export default { ...BasePage, ...LandingPage };

