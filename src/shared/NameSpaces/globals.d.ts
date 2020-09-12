import { NestExpressApplication } from '@nestjs/platform-express';

declare let app: NestExpressApplication

declare global {
  namespace NodeJS {
    interface Global {
      app: NestExpressApplication
      document: Document
      navigator: Navigator
      window: Window
    }
  }
}
