import * as config from '@/config'
import { Pinecone, PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone'

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string })

export const index = pinecone.index(config.index)

export const namespace = index.namespace(config.namespace)

export const create = (data: PineconeRecord<RecordMetadata>[]) => namespace.upsert(data).then(logger.sillier)

export const update = (data: PineconeRecord<RecordMetadata>) => namespace.update(data).then(logger.sillier)

export const destroy = (ids: string[]) => (
	ids.length === 1 ? namespace.deleteOne(ids[0] as string) : namespace.deleteMany(ids)
).then(logger.sillier)

export default pinecone