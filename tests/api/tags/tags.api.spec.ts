import { test } from "../../../fixtures";

test.describe("Tags", () => {
  test(
    "Users can Fetch Tags Successfully",
    { tag: "@API" },
    async ({ tags }) => {
      const response = await tags.fetch();

      test.expect(response.status).toBe(200);
      test.expect(response.body.tags).toBeTruthy();
    }
  );
});
