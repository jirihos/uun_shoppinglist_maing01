const { TestHelper } = require("uu_appg01_server-test");
const { ObjectId } = require("bson");
const { MONGO_ID } = require("../general-test-helper");

async function insertMock(uuIdentity, memberUuIdentityList = []) {
  await TestHelper.executeDbScript(
    `db.shoppingList.insertOne({
          _id: ObjectId("${MONGO_ID}"),
          awid: "${TestHelper.getAwid()}",
          name: "Shopping list",
          archived: false,
          ownerUuIdentity: "${uuIdentity}",
          memberUuIdentityList: ${JSON.stringify(memberUuIdentityList)},
          itemList: []
        });`
  );
}

function getMockData(awid, uuIdentity) {
  const sys = {
    cts: "2022-01-14 10:50:21.637Z", // create timestamp
    mts: "2022-01-14 10:50:42.542Z", // modification timestamp
    rev: 1, // revision number
  };

  const map = {
    OWNER: {
      awid,
      sys,
      name: "Owner",
      archived: false,
      ownerUuIdentity: uuIdentity,
      memberUuIdentityList: [],
      itemList: [
        {
          id: new ObjectId(),
          text: "Item 1",
          completed: false,
        },
      ],
    },
    OWNER_ARCHIVED: {
      awid,
      sys,
      name: "Owner, archived",
      archived: true,
      ownerUuIdentity: uuIdentity,
      memberUuIdentityList: [],
      itemList: [
        {
          id: new ObjectId(),
          text: "Item 1",
          completed: true,
        },
      ],
    },
    NO_ACCESS: {
      awid,
      sys,
      name: "No access",
      archived: false,
      ownerUuIdentity: "1-1",
      memberUuIdentityList: [],
      itemList: [
        {
          id: new ObjectId(),
          text: "Item 1",
          completed: false,
        },
        {
          id: new ObjectId(),
          text: "Item 2",
          completed: false,
        },
      ],
    },
    MEMBER: {
      awid,
      sys,
      name: "Member",
      archived: false,
      ownerUuIdentity: "1-1",
      memberUuIdentityList: [uuIdentity],
      itemList: [
        {
          id: new ObjectId(),
          text: "Item 1",
          completed: false,
        },
        {
          id: new ObjectId(),
          text: "Item 2",
          completed: false,
        },
        {
          id: new ObjectId(),
          text: "Item 3",
          completed: false,
        },
      ],
    },
  };

  const array = Object.values(map);

  return { map, array };
}

module.exports = { insertMock, getMockData };
