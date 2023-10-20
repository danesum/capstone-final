let encodedTerm = encodeURI("taylor swift");
let searchCategory = "music";
test("Function for forming URLs work", () => {
  expect(`/search/?search=${encodedTerm}&category=${searchCategory}`).toBe(
    "/search/?search=taylor%20swift&category=music"
  );
});
