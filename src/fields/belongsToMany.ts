import inflection = require("inflection");
import { BelongsToManyOptions } from "sequelize/types";
import { Association } from "./base";

class BelongsToMany extends Association {
  targetModelName(): string {
    return inflection.singularize(this.targetKey);
  }

  sequelizeMethodName() {
    return "belongsToMany" as const;
  }

  sequelizeMethodArgs(): BelongsToManyOptions {
    return {
      through: this.throughTableName(),
    };
  }

  throughTableName() {
    const tables = [
      this.sourceModel.tableName,
      this.sourceModel.sequelize.models[this.targetModelName()].tableName,
    ].sort();

    return tables.join("_");
  }
}

export { BelongsToMany };
