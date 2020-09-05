import { plainToClass } from 'class-transformer';
import { Model, Types } from 'mongoose';

import { DocumentType, index, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../../../config/common/base.entity';

const serialize = {
  getters: true,
  virtuals: true,
  transform: (_document, mutated) => {
    delete mutated.id;
    const transformed = plainToClass(PostSchema, mutated);
    return transformed;
  },
};

const schemaOptions = {
  collection: 'posts',
  toObject: serialize,
  toJSON: serialize,
  timestamps: true,
  versionKey: false
};

@modelOptions({ schemaOptions })
export class PostSchema extends BaseSchema {
  @prop({ required: true })
  public userId: Types.ObjectId;

  @prop({ required: true })
  public title: String;

  @prop()
  public body: String;
}

export type PartialPost = Partial<PostSchema>;
export type PostDocument = DocumentType<PostSchema>;
export type PostModel = Model<PostDocument>;
