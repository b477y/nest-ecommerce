import { FilterQuery, Model, PopulateOptions, ReturnsNewDoc, UpdateWriteOpResult } from 'mongoose';

export abstract class DatabaseRepository<TDocument> {
  protected constructor(protected readonly model: Model<TDocument>) {}

  async findOne({
    filter,
    populate,
  }: {
    filter?: FilterQuery<TDocument>;
    populate?: PopulateOptions[];
  }): Promise<TDocument | null> {
    return await this.model.findOne(filter || {}).populate(populate || []);
  }

  async updateOne({
    filter,
    data,
  }: {
    filter: FilterQuery<TDocument>;
    data: any;
  }): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(filter || {}, data || {});
  }

  async create(data: Partial<TDocument>): Promise<TDocument | null> {
    return await this.model.create(data);
  }
}
