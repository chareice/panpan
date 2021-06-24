import { Panpan } from "..";

test("Assert Get Model from Panpan", async () => {
  const panpan = new Panpan("sqlite::memory:");

  await panpan.build((table) => {
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

  const UserModel = panpan.getModel("user");

  const chareice = await UserModel.create({
    name: "chareice",
    username: "chareice",
  });

  const PostModel = panpan.getModel("post");

  await PostModel.create({
    title: "Hello",
    user_id: chareice.get("id"),
  });
});
