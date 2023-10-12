import React from "react";
import Link from "../Link.react";
import renderer from "react-test-renderer";
test("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://localhost:3000/">App</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
