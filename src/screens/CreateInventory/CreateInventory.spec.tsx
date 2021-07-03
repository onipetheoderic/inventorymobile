import React from "react";

jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);
jest.mock("@react-navigation/native");
import renderer from "react-test-renderer";

import CreateInventory from "../CreateInventory/index";

describe("<CreateInventory />", () => {
  it("matches last snapshot", async () => {
    const tree = renderer.create(<CreateInventory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
