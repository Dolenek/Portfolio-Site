import "react-i18next";

import type en from "./locales/en/common.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
