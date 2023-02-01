import jsonBuilder from "../functions/json-builder/1.0";
describe("Build a JSON Object", () => {
  test("Build a JSON object", async () => {
    const keyValue = [
      { key: "one", value: "two" },
      { key: "test", value: "great" },
      { key: "multi.parent.object", value: "great" },
    ];
    const appendObject = { iam: "test" };

    const { output } = await jsonBuilder({ keyValue, appendObject });

    expect(output).toEqual({
      one: "two",
      test: "great",
      iam: "test",
      multi: { parent: { object: "great" } },
    });
  });
});
