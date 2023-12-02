const { TestHelper } = require("uu_appg01_server-test");
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { mockDaoFactory, getSessionMock, getAuthzResultMock } = require("../general-test-helper");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("uuCmd shoppingList/create", () => {
  test("HDS - Authenticated", async () => {
    let session = await TestHelper.login("Authenticated");

    const dtoIn = {
      name: "Shopping list",
    };
    const result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.name).toEqual(dtoIn.name);
    expect(data.archived).toEqual(false);
    expect(data.ownerUuIdentity).toEqual(session.getIdentity().getUuIdentity());
    expect(data.memberUuIdentityList).toEqual([]);
    expect(data.itemList).toEqual([]);
    expect(data.awid).toEqual(TestHelper.getAwid());
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - Executives", async () => {
    await TestHelper.login("Executives");

    const dtoIn = {
      name: "Shopping list",
      ownerUuIdentity: "1-1",
    };
    const result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.name).toEqual(dtoIn.name);
    expect(data.archived).toEqual(false);
    expect(data.ownerUuIdentity).toEqual(dtoIn.ownerUuIdentity);
    expect(data.memberUuIdentityList).toEqual([]);
    expect(data.itemList).toEqual([]);
    expect(data.awid).toEqual(TestHelper.getAwid());
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("unsupportedKeys", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = {
      name: "Shopping list",
      foo: "bar",
    };
    const result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.name).toEqual(dtoIn.name);
    expect(data.archived).toEqual(false);
    expect(data.ownerUuIdentity).toBeDefined();
    expect(data.memberUuIdentityList).toEqual([]);
    expect(data.itemList).toEqual([]);
    expect(data.awid).toEqual(TestHelper.getAwid());

    let warning = data.uuAppErrorMap["uun-shoppinglist-main/shoppingList/create/unsupportedKeys"];
    expect(warning.type).toEqual("warning");
    expect(warning.paramMap.unsupportedKeyList).toEqual(["$.foo"]);
  });

  test("invalidDtoIn", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    try {
      await TestHelper.executePostCommand("shoppingList/create", {});
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });

  test("invalidShoppingListName", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      name: " aa",
    };
    try {
      await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/create/invalidShoppingListName");
      expect(e.paramMap.name).toEqual(dtoIn.name);
      expect(e.status).toEqual(400);
    }
  });

  test("userNotAuthorized", async () => {
    expect.assertions(2);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      name: "Shopping list",
      ownerUuIdentity: "1-1",
    };
    try {
      await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/create/userNotAuthorized");
      expect(e.status).toEqual(403);
    }
  });

  test("shoppingListDaoCreateFailed", async () => {
    expect.assertions(2);
    await TestHelper.login("Authenticated");

    let { ShoppingListAbl } = mockAbl();
    ShoppingListAbl.dao.create = () => {
      throw new ObjectStoreError("foobar");
    };

    const dtoIn = {
      name: "Shopping list",
    };
    try {
      await ShoppingListAbl.create(TestHelper.getAwid(), dtoIn, getSessionMock(), getAuthzResultMock());
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/create/shoppingListDaoCreateFailed");
      expect(e.status).toEqual(500);
    }
  });

  test("other DAO errors", async () => {
    expect.assertions(1);
    await TestHelper.login("Authenticated");

    let { ShoppingListAbl } = mockAbl();
    ShoppingListAbl.dao.create = () => {
      throw new Error("foobar");
    };

    const dtoIn = {
      name: "Shopping list",
    };
    try {
      await ShoppingListAbl.create(TestHelper.getAwid(), dtoIn, getSessionMock(), getAuthzResultMock());
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
