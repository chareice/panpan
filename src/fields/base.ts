import {
  BelongsToManyOptions,
  BelongsToOptions,
  HasOneOptions,
  HasManyOptions,
  DataType,
  ColumnOptions,
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
  protected defaultValue: unknown;
  public _description: string | null = null;

  constructor(name: string) {
    this.name = name;
  }

  default(value: any) {
    this.defaultValue = value;
    return this;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  abstract fieldType(): DataType;

  toSequelizeDefinition() {
    return {
      [this.name]: {
        type: this.fieldType(),
        allowNull: this.allowNull,
        defaultValue: this.defaultValue,
        comment: this._description,
      },
    };
  }
}

abstract class Association {
  protected targetKey: string;
  protected sourceModel: Model;

  protected allowNull = false;

  constructor(target: string, sourceModel: Model) {
    this.sourceModel = sourceModel;
    this.targetKey = target;
  }

  /**
   * 获取关联目标的名称
   */
  abstract targetModelName(): string;

  abstract sequelizeMethodName(): "belongsTo" | "hasOne" | "belongsToMany";

  abstract sequelizeMethodArgs(): BelongsToManyOptions | BelongsToOptions;

  nullable(_bool: boolean = true) {
    this.allowNull = _bool;
    return this;
  }
}

export { Field, Association };
