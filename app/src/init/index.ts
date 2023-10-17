import { Application } from "@feathersjs/feathers";
import admin from "./admin";

export default (app: Application): void => {
  app.configure(admin)
};