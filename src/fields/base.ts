import {
  BelongsToManyOptions,
  BelongsToOptions,
  HasOneOptions,
  HasManyOptions,
  DataType,
} from "sequelize/types";
import { Model } from "../model";

/**
 * Field 表示数据库的一个字段
 *
 * Attribute
 * name 字段名称
 * type 字段类型
 * nullable 是否可以为null
 */
abstract class Field {
  protected name: string;
  protected allowNull = false;

  constructor(name: string) {
    this.name = name;
  }

  abstract fieldType(): DataType;

  toSequelizeDefinition() {
    return {
      [this.name]: {
        type: this.fieldType(),
        allowNull: this.allowNull,
      },
    };
  }
}

abstract class Association {
  protected target: string;
  protected sourceModel: Model;

  protected allowNull = false;

  constructor(target: string, sourceModel: Model) {
    this.sourceModel = sourceModel;
    this.target = target;
  }

  /**
   * 获取关联目标的名称
   */
  abstract targetModelName(): string;

  abstract sequelizeMethodName(): "belongsTo" | "hasOne" | "belongsToMany";

  abstract sequelizeMethodArgs(): BelongsToManyOptions | BelongsToOptions;
}

export { Field, Association };
