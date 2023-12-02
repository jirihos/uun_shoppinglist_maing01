const { TestHelper } = require("uu_appg01_server-test");
const { getMockData } = require("./test-data");

let mockData = {};

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });

  let session = await TestHelper.login("Authenticated");
  let { map, array } = getMockData(TestHelper.getAwid(), session.getIdentity().getUuIdentity());

  // deep copy
  mockData = JSON.parse(JSON.stringify(map));

  Object.values(mockData).forEach((shoppingList) => {
    shoppingList.itemListCount = shoppingList.itemList.length;
    delete shoppingList.itemList;
  });

  await TestHelper.executeDbScript(`db.shoppingList.insertMany(${JSON.stringify(array)});`);
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("uuCmd shoppingList/list", () => {
  test("HDS - default dtoIn (Authenticated)", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = {};
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(0);
    expect(data.pageInfo.pageSize).toEqual(20);
    expect(data.pageInfo.total).toEqual(3);

    data.itemList.forEach((shoppingList) => {
      delete shoppingList.id;
    });
    expect(data.itemList.length).toEqual(3);
    expect(data.itemList).toContainEqual(mockData.OWNER);
    expect(data.itemList).toContainEqual(mockData.OWNER_ARCHIVED);
    expect(data.itemList).toContainEqual(mockData.MEMBER);

    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - archived false (Authenticated)", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = {
      archived: false,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(0);
    expect(data.pageInfo.pageSize).toEqual(20);
    expect(data.pageInfo.total).toEqual(2);

    data.itemList.forEach((shoppingList) => {
      delete shoppingList.id;
    });
    expect(data.itemList.length).toEqual(2);
    expect(data.itemList).toContainEqual(mockData.OWNER);
    expect(data.itemList).toContainEqual(mockData.MEMBER);

    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - archived true (Authenticated)", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = {
      archived: true,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(0);
    expect(data.pageInfo.pageSize).toEqual(20);
    expect(data.pageInfo.total).toEqual(1);

    data.itemList.forEach((shoppingList) => {
      delete shoppingList.id;
    });
    expect(data.itemList.length).toEqual(1);
    expect(data.itemList).toContainEqual(mockData.OWNER_ARCHIVED);

    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - list all (Executives)", async () => {
    await TestHelper.login("Executives");

    const dtoIn = {
      all: true,
    };
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(0);
    expect(data.pageInfo.pageSize).toEqual(20);
    expect(data.pageInfo.total).toEqual(4);

    data.itemList.forEach((shoppingList) => {
      delete shoppingList.id;
    });
    expect(data.itemList.length).toEqual(4);
    expect(data.itemList).toContainEqual(mockData.OWNER);
    expect(data.itemList).toContainEqual(mockData.OWNER_ARCHIVED);
    expect(data.itemList).toContainEqual(mockData.NO_ACCESS);
    expect(data.itemList).toContainEqual(mockData.MEMBER);

    expect(data.uuAppErrorMap).toEqual({});
  });

  test("HDS - custom dtoIn (Authenticated)", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = {
      pageInfo: {
        pageIndex: 1,
        pageSize: 2,
      },
    };
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(dtoIn.pageInfo.pageIndex);
    expect(data.pageInfo.pageSize).toEqual(dtoIn.pageInfo.pageSize);
    expect(data.pageInfo.total).toEqual(3);

    expect(data.itemList.length).toEqual(1);

    expect(data.uuAppErrorMap).toEqual({});
  });

  test("unsupportedKeys", async () => {
    await TestHelper.login("Authenticated");

    const dtoIn = { foo: "bar" };
    const result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    const { data } = result;

    expect(result.status).toEqual(200);
    expect(data.pageInfo.pageIndex).toEqual(0);
    expect(data.pageInfo.pageSize).toEqual(20);
    expect(data.pageInfo.total).toEqual(3);

    data.itemList.forEach((shoppingList) => {
      delete shoppingList.id;
    });
    expect(data.itemList.length).toEqual(3);
    expect(data.itemList).toContainEqual(mockData.OWNER);
    expect(data.itemList).toContainEqual(mockData.OWNER_ARCHIVED);
    expect(data.itemList).toContainEqual(mockData.MEMBER);

    let warning = data.uuAppErrorMap["uun-shoppinglist-main/shoppingList/list/unsupportedKeys"];
    expect(warning.type).toEqual("warning");
    expect(warning.paramMap.unsupportedKeyList).toEqual(["$.foo"]);
  });

  test("invalidDtoIn", async () => {
    expect.assertions(3);
    await TestHelper.login("Authenticated");

    const dtoIn = { pageInfo: "foobar" };
    try {
      await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/list/invalidDtoIn");
      expect(Object.keys(e.paramMap.invalidTypeKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });

  test("userNotAuthorized", async () => {
    expect.assertions(2);
    await TestHelper.login("Authenticated");

    const dtoIn = {
      all: true,
    };
    try {
      await TestHelper.executeGetCommand("shoppingList/list", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uun-shoppinglist-main/shoppingList/list/userNotAuthorized");
      expect(e.status).toEqual(403);
    }
  });
});
