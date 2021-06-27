import { Pandb } from "..";

test("Assert Get Model from Panpan", async () => {
  const pandb = new Pandb("sqlite::memory:");

  await pandb.build((table) => {
    table({
      name: "user",
      fields(t) {
        t.string("name");
        t.string("username");
      },
    });

    table({
      name: "post",
      fields(t) {
        t.string("title");
        t.bool("disabled").default(false);
        t.belongsTo("user");
      },
    });

    table({
      name: "tags",
      fields(t) {
        t.string("name");
        t.belongsToMany("posts");
      },
    });
  });

  const UserModel = pandb.getModel("user");

  const chareice = await UserModel.create({
    name: "chareice",
    username: "chareice",
  });

  const PostModel = pandb.getModel("post");

  await PostModel.create({
    title: "Hello",
    user_id: chareice.get("id"),
  });

  console.log({ PostModel: PostModel.rawAttributes });
});
