import { plainToClass } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { DocumentType, index, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../../../config/common/base.entity';

const serialize = {
  getters: true,
  virtuals: true,
  transform: (_document, mutated) => {
    delete mutated.id;
    const transformed = plainToClass(CommentSchema, mutated);
    return transformed;
  },
};

const schemaOptions = {
  // collection name
  collection: 'comments',
  // serialize object
  toObject: serialize,
  // serialize json
  toJSON: serialize,
  // enable created and updated
  timestamps: true,
  // disable _v
  versionKey: false,
};

@modelOptions({ schemaOptions })
export class CommentSchema extends BaseSchema {
  @prop({ required: true })
  public userId: Types.ObjectId;

  @prop({ required: true })
  public postId: Types.ObjectId;

  @prop({ required: true })
  public comment: String;
}

export type PartialComment = Partial<CommentSchema>;
export type CommentDocument = DocumentType<CommentSchema>;
export type CommentModel = Model<CommentDocument>;
