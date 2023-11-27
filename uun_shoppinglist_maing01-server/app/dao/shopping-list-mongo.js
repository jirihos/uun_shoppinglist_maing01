"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ShoppingListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex(
      { awid: 1, "itemList.id": 1 },
      { unique: true, partialFilterExpression: { "itemList.id": { $type: "objectId" } } }
    );
    await super.createIndex({ awid: 1, ownerUuIdentity: 1 });
    await super.createIndex({ awid: 1, memberUuIdentityList: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };

    if (uuObject.itemList) {
      uuObject.itemList = uuObject.itemList.map(({ ...item }) => {
        item.id = new ObjectId(item.id);
        return item;
      });
    }

    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    await super.deleteOne({ id, awid });
  }

  async list(awid, criteria, pageInfo = {}) {
    let filter = { awid, ...criteria };

    return await super.find(filter, pageInfo);
  }
}

module.exports = ShoppingListMongo;
