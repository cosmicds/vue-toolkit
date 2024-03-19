import {
  EnhancedPageObject,
  NightwatchAPI,
  NightwatchTests,
  // WindowSize
} from "nightwatch";

import { BaseTestPage } from "page_objects/Base";

type Tests = NightwatchTests & { app: BaseTestPage };

const tests: Tests = {

  app: null as unknown as (EnhancedPageObject & BaseTestPage),

  before(browser: NightwatchAPI): void {
    browser.globals.waitForConditionTimeout = 30000;
    this.app = browser.page.Base();
  }
};

export default tests;
