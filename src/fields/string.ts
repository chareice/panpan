import { DataType, DataTypes } from "sequelize";
import { Field } from "./base";

class StringField extends Field {
  fieldType(): DataType {
    return DataTypes.STRING;
  }
}

export { StringField };
