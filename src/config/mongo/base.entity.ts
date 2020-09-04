import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';
import {
  modelOptions,
  prop,
  setGlobalOptions,
} from '@typegoose/typegoose';

setGlobalOptions({ globalOptions: { useNewEnum: true } });

@Exclude()
@modelOptions({ schemaOptions: { timestamps: true } })
export class BaseSchema {
  @Expose()
  @prop({ auto: true })
  public readonly _id: Types.ObjectId;

  @prop()
  public readonly createdAt: Date;

  @prop()
  public readonly updatedAt: Date;
}
