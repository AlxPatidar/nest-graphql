import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { DocumentType, modelOptions, prop } from '@typegoose/typegoose';

import { BaseSchema } from '../../config/common/base.entity';

const serialize = {
  getters: true,
  virtuals: true,
  transform: (_document, mutated) => {
    delete mutated.id;
    const transformed = plainToClass(TaskSchema, mutated);
    return transformed;
  },
};

const schemaOptions = {
  // collection name
  collection: 'tasks',
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
export class TaskSchema extends BaseSchema {
  @prop({ required: true })
  public userId: String;
  
  @prop({ required: true })
  public title: String;

  @prop()
  public body: String;
}

export type PartialTask = Partial<TaskSchema>;
export type TaskDocument = DocumentType<TaskSchema>;
export type TaskModel = Model<TaskDocument>;
