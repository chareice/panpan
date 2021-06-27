import { DataType, DataTypes } from "sequelize";
import { Field } from "./base";

class TextField extends Field {
  fieldType(): DataType {
    return DataTypes.TEXT;
  }
}

export { TextField };
