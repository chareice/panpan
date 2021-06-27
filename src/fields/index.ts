import { Model } from "../model";
import { BelongsTo } from "./belongsTo";
import { BelongsToMany } from "./belongsToMany";
import { BooleanField } from "./boolean";
import { GeometryField } from "./geometry";
import { IntField } from "./int";
import { StringField } from "./string";
import { TextField } from "./text";

function FieldDecorator() {}

class FieldBuilder {
  protected model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  string(name: string) {
    const field = new StringField(name);
    this.model.addField(field);
    return field;
  }

  text(name: string) {
    const field = new TextField(name);
    this.model.addField(field);
    return field;
  }

  int(name: string) {
    const field = new IntField(name);
    this.model.addField(field);
    return field;
  }

  bool(name: string) {
    const field = new BooleanField(name);
    this.model.addField(field);
    return field;
  }

  geometry(name: string) {
    const field = new GeometryField(name);
    this.model.addField(field);
    return field;
  }

  belongsTo(name: string) {
    const association = new BelongsTo(name, this.model);
    this.model.associations.push(association);
    return association;
  }

  belongsToMany(name: string) {
    const association = new BelongsToMany(name, this.model);
    this.model.associations.push(association);
    return association;
  }
}

export { FieldBuilder };
