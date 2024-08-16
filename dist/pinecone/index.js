import * as config from '@/config';
import { Pinecone } from '@pinecone-database/pinecone';
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
export const index = pinecone.index(config.index);
export const namespace = index.namespace(config.namespace);
export const create = (data) => namespace.upsert(data);
export const update = (data) => namespace.update(data);
export const destroy = (ids) => (ids.length === 1 ? namespace.deleteOne(ids[0]) : namespace.deleteMany(ids));
export default pinecone;
