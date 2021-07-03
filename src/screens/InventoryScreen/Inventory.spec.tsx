import React from "react";
jest.mock("@react-native-community/async-storage", () =>
  require("@react-native-community/async-storage/jest/async-storage-mock")
);
jest.mock("@react-navigation/native");
import renderer from "react-test-renderer";

import InventoryScreen from "../InventoryScreen/index";

describe("<InventoryScreen />", () => {
  it("matches last snapshot", async () => {
    const tree = renderer.create(<InventoryScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
