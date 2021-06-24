import { DataType, DataTypes } from "sequelize";
import { Field } from "./base";

class IntField extends Field {
  fieldType(): DataType {
    return DataTypes.INTEGER;
  }
}

export { IntField };
