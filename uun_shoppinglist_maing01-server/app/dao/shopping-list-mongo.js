"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, "itemList.id": 1 }, { unique: true });
    await super.createIndex({ awid: 1, ownerUuIdentity: 1 });
    await super.createIndex({ awid: 1, memberUuIdentityList: 1 });
  }
}

module.exports = ShoppingListMongo;
