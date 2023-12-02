const { TestHelper } = require("uu_appg01_server-test");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { MONGO_ID, mockDaoFactory, getSessionMock, getAuthzResultMock } = require("../general-test-helper");
const { insertMock } = require("./test-data");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("uuCmd shoppingList/update", () => {
  test("HDS - Authenticated", async () => {
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();
    await insertMock(uuIdentity);

    const dtoIn = {
      id: MONGO_ID,
      name: "New name",
      archived: true,
    };
    const result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.name).toEqual(dtoIn.name);
    expect(data.archived).toEqual(dtoIn.archived);
    expect(data.awid).toEqual(TestHelper.getAwid());
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - Executives", async () => {
    await TestHelper.login("Executives");
    await insertMock("1-1");

    const dtoIn = {
      id: MONGO_ID,
      name: "New name",
      archived: true,
    };
    const result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.name).toEqual(dtoIn.name);
    expect(data.archived).toEqual(dtoIn.archived);
    expect(data.awid).toEqual(TestHelper.getAwid());
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("unsupportedKeys", async () => {
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();
    await insertMock(uuIdentity);

    const dtoIn = {
      id: MONGO_ID,
      archived: true,
      foo: "bar",
    };
    const result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.archived).toEqual(dtoIn.archived);
    expect(data.awid).toEqual(TestHelper.getAwid());

    let warning = data.uuAppErrorMap["uun-shoppinglist-main/shoppingList/update/unsupportedKeys"];
    expect(warning.type).toEqual("warning");
    expect(warning.paramMap.unsupportedKeyList).toEqual(["$.foo"]);
  });

  test("invalidDtoIn", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    try {
      await TestHelper.executePostCommand("shoppingList/update", {});
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/update/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(3);
      expect(e.status).toEqual(400);
    }
  });

  test("invalidShoppingListName", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      id: MONGO_ID,
      name: " aa",
    };
    try {
      await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/update/invalidShoppingListName");
      expect(e.paramMap.name).toEqual(dtoIn.name);
      expect(e.status).toEqual(400);
    }
  });

  test("shoppingListDoesNotExist", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      id: MONGO_ID,
      archived: false,
    };
    try {
      await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/update/shoppingListDoesNotExist");
      expect(e.paramMap.shoppingListId).toEqual(dtoIn.id);
      expect(e.status).toEqual(400);
    }
  });

  test("userNotAuthorized", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    await insertMock("1-1");

    const dtoIn = {
      id: MONGO_ID,
      archived: true,
    };
    try {
      await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/update/userNotAuthorized");
      expect(e.paramMap.shoppingListId).toEqual(dtoIn.id);
      expect(e.status).toEqual(403);
    }
  });

  test("shoppingListDaoUpdateFailed", async () => {
    expect.assertions(2);
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();

    let { ShoppingListAbl } = mockAbl();
    ShoppingListAbl.dao.get = async () => {
      return {
        id: MONGO_ID,
        awid: TestHelper.getAwid(),
        name: "Shopping list",
        archived: false,
        ownerUuIdentity: uuIdentity,
        memberUuIdentityList: [],
        itemList: [],
      };
    };
    ShoppingListAbl.dao.update = () => {
      throw new ObjectStoreError("foobar");
    };

    const dtoIn = {
      id: MONGO_ID,
      name: "New name",
    };
    try {
      await ShoppingListAbl.update(TestHelper.getAwid(), dtoIn, getSessionMock(uuIdentity), getAuthzResultMock());
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/update/shoppingListDaoUpdateFailed");
      expect(e.status).toEqual(500);
    }
  });

  test("other DAO errors", async () => {
    expect.assertions(1);
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();

    let { ShoppingListAbl } = mockAbl();
    ShoppingListAbl.dao.get = async () => {
      return {
        id: MONGO_ID,
        awid: TestHelper.getAwid(),
        name: "Shopping list",
        archived: false,
        ownerUuIdentity: uuIdentity,
        memberUuIdentityList: [],
        itemList: [],
      };
    };
    ShoppingListAbl.dao.update = () => {
      throw new Error("foobar");
    };

    const dtoIn = {
      id: MONGO_ID,
      name: "New name",
    };
    try {
      await ShoppingListAbl.update(TestHelper.getAwid(), dtoIn, getSessionMock(uuIdentity), getAuthzResultMock());
    } catch (e) {
      expect(e.message).toEqual("foobar");
    }
  });
});

function mockAbl() {
  mockDaoFactory();
  const ShoppingListAbl = require("../../app/abl/shopping-list-abl");

  return { ShoppingListAbl };
}
