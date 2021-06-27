import { DataType, DataTypes } from "sequelize";
import { Field } from "./base";

class GeometryField extends Field {
  protected _fieldType: DataType = DataTypes.GEOMETRY;

  fieldType(): DataType {
    return this._fieldType;
  }

  point() {
    this._fieldType = DataTypes.GEOMETRY("POINT");
    return this;
  }
}

export { GeometryField };
