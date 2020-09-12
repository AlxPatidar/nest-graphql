import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../../../config/common/base.entity';

const serialize = {
  getters: true,
  virtuals: true,
  transform: (_document, mutated) => {
    delete mutated.id;
    const transformed = plainToClass(UserSchema, mutated);
    return transformed;
  },
};

const schemaOptions = {
  collection: 'users',
  toObject: serialize,
  toJSON: serialize,
  timestamps: true,
  versionKey: false
};

export class LatLongSchema {
  @prop()
  public lat: string;
  @prop()
  public long: string;
}

export class AddressSchema {
  @prop()
  public street: string;
  @prop()
  public city: string;
  @prop()
  public zipcode: string;
  @prop()
  public geo: LatLongSchema;
}

@modelOptions({ schemaOptions })
export class UserSchema extends BaseSchema {
  @prop({ required: true })
  public name: String;

  @prop({ required: true })
  public email: String;

  @prop({ nullable: true })
  public website?: string;

  @prop({ nullable: true })
  public phone?: string;

  @prop()
  public address: AddressSchema;
}




export type PartialUser = Partial<UserSchema>;
export type UserDocument = DocumentType<UserSchema>;
export type UserModel = Model<UserDocument>;
