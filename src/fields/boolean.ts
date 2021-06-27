import { DataType, DataTypes } from "sequelize";
import { Field } from "./base";

class BooleanField extends Field {
  fieldType(): DataType {
    return DataTypes.BOOLEAN;
  }
}

export { BooleanField };
