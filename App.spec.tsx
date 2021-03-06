import React from "react";
import renderer from "react-test-renderer";

import CreateInventory from "./src/screens/CreateInventory";

describe("<CreateInventory />", () => {
  it("has 2 child", () => {
    const tree: any = renderer.create(<CreateInventory />).toJSON();
    expect(tree?.children?.length).toBe(2);
  });

  it("matches last snapshot", async () => {
    const tree = renderer.create(<CreateInventory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
