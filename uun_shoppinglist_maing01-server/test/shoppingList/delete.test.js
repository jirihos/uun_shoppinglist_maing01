const { TestHelper } = require("uu_appg01_server-test");
const { MONGO_ID } = require("../general-test-helper");
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

describe("uuCmd shoppingList/delete", () => {
  test("HDS - own shopping list (Authenticated)", async () => {
    expect.assertions(3);
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();
    await insertMock(uuIdentity);

    const dtoIn = {
      id: MONGO_ID,
    };
    const result = await TestHelper.executePostCommand("shoppingList/delete", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.uuAppErrorMap).toEqual({});

    try {
      await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/shoppingListDoesNotExist");
    }
  });

  test("HDS - else's shopping list (Executives)", async () => {
    expect.assertions(3);
    await TestHelper.login("Executives");
    await insertMock("1-1");

    const dtoIn = {
      id: MONGO_ID,
    };
    const result = await TestHelper.executePostCommand("shoppingList/delete", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.uuAppErrorMap).toEqual({});

    try {
      await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/shoppingListDoesNotExist");
    }
  });

  test("HDS - own shopping list (Authenticated)", async () => {
    expect.assertions(4);
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();
    await insertMock(uuIdentity);

    const dtoIn = {
      id: MONGO_ID,
      foo: "bar",
    };
    const result = await TestHelper.executePostCommand("shoppingList/delete", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);

    let warning = data.uuAppErrorMap["uun-shoppinglist-main/shoppingList/delete/unsupportedKeys"];
    expect(warning.type).toEqual("warning");
    expect(warning.paramMap.unsupportedKeyList).toEqual(["$.foo"]);

    try {
      await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/shoppingListDoesNotExist");
    }
  });

  test("invalidDtoIn", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    try {
      await TestHelper.executePostCommand("shoppingList/delete", {});
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/delete/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });

  test("shoppingListDoesNotExist", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      id: MONGO_ID,
    };
    try {
      await TestHelper.executePostCommand("shoppingList/delete", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/delete/shoppingListDoesNotExist");
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
    };
    try {
      await TestHelper.executePostCommand("shoppingList/delete", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/delete/userNotAuthorized");
      expect(e.paramMap.shoppingListId).toEqual(dtoIn.id);
      expect(e.status).toEqual(403);
    }
  });
});
