import { Awaitable, EnhancedPageObject, PageObjectModel } from "nightwatch";

const commands = {
  setComponent(this: EnhancedPageObject, component: string): Awaitable<EnhancedPageObject, null> {
    return this.navigateTo(`#${component}`);
  }
};

const elements = {
  app: {
    selector: "#test-app"
  },
  component: {
    selector: ".test-component"
  }
};

const page: PageObjectModel = {
  url: "http://localhost:8080",
  commands,
  elements,
};

const sections = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: Record<string, any> = {};

export default page;

export type BaseTestPage =
  EnhancedPageObject<typeof commands,
                     typeof elements,
                     typeof sections> &
                     { props: typeof props };


