import {
  Model as SequelizeModel,
  Sequelize,
  ModelOptions as SequelizeModelOptions,
} from "sequelize";
import * as inflection from "inflection";
import { FieldBuilder } from "./fields";
import { Association, Field } from "./fields/base";

type fieldBuilderFunc = (filedBuilder: FieldBuilder) => void;

export interface ModelOptions {
  name: string;
  fields: fieldBuilderFunc;
}

/**
 * Model
 * 代表数据库中的一个数据表
 *
 * Attribute
 * 	TableName 表名
 * 	Fields 字段集合
 *	Relations 关联
 */
class Model {
  public tableName: string;
  public name: string;
  private fields: Field[] = [];
  public sequelize: Sequelize;

  public associations: Association[] = [];
  public sequelizeModel: typeof SequelizeModel;

  constructor(options: ModelOptions, sequelize: Sequelize) {
    this.sequelize = sequelize;

    // 模型名称
    this.name = options.name;
    // 表名为模型名称的复数形式
    this.tableName = inflection.tableize(options.name);

    // 构建Fields函数
    options.fields(new FieldBuilder(this));

    this.sequelizeModel = this.buildSequelizeModel();
  }

  sequelizeOptions(): SequelizeModelOptions {
    return {
      underscored: true,
    };
  }

  buildSequelizeModel() {
    const sequelizeOptions = this.fields.reduce((carry, field) => {
      return {
        ...carry,
        ...field.toSequelizeDefinition(),
      };
    }, {});

    const model = this.sequelize.define(
      this.name,
      sequelizeOptions,
      this.sequelizeOptions()
    );

    return model;
  }

  // 添加字段
  addField(field: Field): void {
    this.fields.push(field);
  }

  // 添加关联
  addAssociation(association: Association): void {
    this.associations.push(association);
  }

  getSequelizeModel() {}
}

export { Model };
