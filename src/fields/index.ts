import { Model } from "../model";
import { BelongsTo } from "./belongsTo";
import { BelongsToMany } from "./belongsToMany";
import { IntField } from "./int";
import { StringField } from "./string";

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

  int(name: string) {
    const field = new IntField(name);
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
