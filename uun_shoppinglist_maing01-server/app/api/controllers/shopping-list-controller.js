"use strict";
const ShoppingListAbl = require("../../abl/shopping-list-abl.js");

class ShoppingListController {
  list(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.list(awid, dtoIn, session, authorizationResult);
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.get(awid, dtoIn, session, authorizationResult);
  }

  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.create(awid, dtoIn, session, authorizationResult);
  }

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.update(awid, dtoIn, session, authorizationResult);
  }

  addMember(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.addMember(awid, dtoIn, session, authorizationResult);
  }

  removeMember(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.removeMember(awid, dtoIn, session, authorizationResult);
  }

  addItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.addItem(awid, dtoIn, session, authorizationResult);
  }

  removeItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.removeItem(awid, dtoIn, session, authorizationResult);
  }

  setItemCompleted(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    return ShoppingListAbl.setItemCompleted(awid, dtoIn);
  }

  delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.delete(awid, dtoIn, session, authorizationResult);
  }
}

module.exports = new ShoppingListController();
