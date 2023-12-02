function mockDaoFactory() {
  const { DaoFactory } = require("uu_appg01_server").ObjectStore;

  jest.spyOn(DaoFactory, "getDao").mockImplementation(() => {
    let dao = {
      createSchema: () => {},
    };
    return dao;
  });
}

function getSessionMock(uuIdentity = "1-1", name = "Jan Novák") {
  let identity = {
    getUuIdentity: () => uuIdentity,
    getName: () => name,
  };
  return { getIdentity: () => identity };
}

function getAuthzResultMock(authorizedProfiles = ["Authenticated"]) {
  return {
    getAuthorizedProfiles: () => authorizedProfiles,
  };
}

module.exports = {
  MONGO_ID: "012345678910111213141516",
  mockDaoFactory,
  getSessionMock,
  getAuthzResultMock,
};
