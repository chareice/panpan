import { Sequelize, Model as SequelizeModel } from "sequelize";
import { Model, ModelOptions } from "./model";

class Pandb {
  private sequelizeInstance: Sequelize;
  private modelsMap = new Map<string, Model>();

  constructor(databaseURI: string) {
    this.sequelizeInstance = new Sequelize(databaseURI);
  }

  getModelByName(name: string) {
    return this.modelsMap.get(name);
  }

  getModel(modelName: string) {
    return this.sequelizeInstance.models[modelName];
  }

  addModel(options: ModelOptions): Model {
    const model = new Model(options, this.sequelizeInstance);
    this.modelsMap.set(options.name, model);
    return model;
  }

  async build(buildTables: (table: (options: ModelOptions) => Model) => void) {
    // 1. 构建表格
    buildTables(this.addModel.bind(this));
    // 2. 构建关联
    this.buildRelations();
    // 3. 迁移数据库
    await this.sequelizeInstance.sync();
  }

  buildRelations() {
    this.modelsMap.forEach((model) => {
      model.associations.forEach((association) => {
        const targetModelName = association.targetModelName();

        this.sequelizeInstance.models[model.name][
          association.sequelizeMethodName()
        ](
          this.sequelizeInstance.models[targetModelName],
          association.sequelizeMethodArgs() as any
        );
      });
    });
  }

  /**
   * createModel 创建数据库模型
   * @param name 模型名称
   *
   * const User = createModel({
   * 	name: "users",
   * 	fields(t) {
   * 		t.string("username");
   * 		t.string("name");
   * 		t.hasOne("profile");
   * 		t.hasMany("posts");
   * 	}
   * })
   *
   * const Profile = createModel("profile", (t) => {
   * 	t.string("age");
   * 	t.string("name");
   * 	t.belongsTo("user");
   * })
   *
   * const Post = createModel("posts", (t) => {
   *	t.string("title");
   *  t.belongsTo("user");
   *  t.belongsToMany("tags");
   * })
   *
   * ```javascript
   * const Tag = createModel("tags", (t) => {
   *   t.string("name");
   *   t.belongsToMany("posts");
   * })
   * ```
   */
  // createModel(name: string, defineFunction) {}
}

export { Pandb };
