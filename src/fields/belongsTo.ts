import inflection = require("inflection");
import { Association } from "./base";
import { BelongsToOptions } from "sequelize/types";

class BelongsTo extends Association {
  /**
   * 关联目标的模型名称
   */
  protected _targetModelName: string | null = null;

  sequelizeMethodName() {
    return "belongsTo" as const;
  }

  sequelizeMethodArgs(): BelongsToOptions {
    return {
      foreignKey: {
        name: inflection.foreign_key(`${this.targetKey}`),
        allowNull: this.allowNull,
      },
    };
  }

  /**
   * 关联目标的模型名称，如果未设置取target
   */
  targetModelName(): string {
    return this._targetModelName || this.targetKey;
  }

  target(target: string) {
    this._targetModelName = target;
    return this;
  }
}

export { BelongsTo };
