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

describe("uuCmd shoppingList/get", () => {
  test("HDS - own shopping list (Authenticated)", async () => {
    await TestHelper.login("Authenticated");

    let shoppingList = await TestHelper.executePostCommand("shoppingList/create", { name: "Shopping list" });

    const dtoIn = {
      id: shoppingList.id,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data).toEqual(shoppingList);
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - member shopping list (Authenticated)", async () => {
    let session = await TestHelper.login("Authenticated");
    let uuIdentity = session.getIdentity().getUuIdentity();

    await insertMock("1-1", [uuIdentity]);

    const dtoIn = {
      id: MONGO_ID,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.id).toEqual(dtoIn.id);
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - else's shopping list (Executives)", async () => {
    await TestHelper.login("Executives");

    let shoppingList = await TestHelper.executePostCommand("shoppingList/create", {
      name: "Shopping list",
      ownerUuIdentity: "1-1",
    });

    const dtoIn = {
      id: shoppingList.id,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data).toEqual(shoppingList);
    expect(data.uuAppErrorMap).toEqual({});
  });

  test("unsupportedKeys", async () => {
    await TestHelper.login("Authenticated");

    let shoppingList = await TestHelper.executePostCommand("shoppingList/create", { name: "Shopping list" });

    const dtoIn = {
      id: shoppingList.id,
      foo: "bar",
    };
    const result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.id).toEqual(dtoIn.id);

    let warning = data.uuAppErrorMap["uun-shoppinglist-main/shoppingList/get/unsupportedKeys"];
    expect(warning.type).toEqual("warning");
    expect(warning.paramMap.unsupportedKeyList).toEqual(["$.foo"]);
  });

  test("invalidDtoIn", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    try {
      await TestHelper.executeGetCommand("shoppingList/get", {});
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/invalidDtoIn");
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
      await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/shoppingListDoesNotExist");
      expect(e.paramMap.shoppingListId).toEqual(dtoIn.id);
      expect(e.status).toEqual(400);
    }
  });

  test("userNotAuthorized", async () => {
    expect.assertions(3);

    await insertMock("1-1");

    await TestHelper.login("Authenticated");

    const dtoIn = {
      id: MONGO_ID,
    };
    try {
      await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/get/userNotAuthorized");
      expect(e.paramMap.shoppingListId).toEqual(dtoIn.id);
      expect(e.status).toEqual(403);
    }
  });
});
