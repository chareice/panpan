import inflection = require("inflection");
import { Association } from "./base";
import { BelongsToOptions } from "sequelize/types";

class BelongsTo extends Association {
  sequelizeMethodName() {
    return "belongsTo" as const;
  }

  sequelizeMethodArgs(): BelongsToOptions {
    return { foreignKey: inflection.foreign_key(`${this.target}`) };
  }

  targetModelName(): string {
    return this.target;
  }
}

export { BelongsTo };
