import { Pinecone, PineconeRecord, RecordMetadata, RecordValues } from '@pinecone-database/pinecone'

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string })

export const index = pinecone.index(process.env.PINECONE_INDEX as string)

export const namespace = index.namespace(process.env.PINECONE_NAMESPACE as string)

export const create = (...data: PineconeRecord<RecordMetadata>[]) => namespace.upsert(data)

export const update = (
	id: string,
	values: RecordValues,
	metadata: Partial<RecordMetadata>
) => namespace.update({ id, metadata, values })

export const destroy = (...ids: [string] & string[]) => (
	ids.length === 1 ? namespace.deleteOne(ids[0]) : namespace.deleteMany(ids)
)

export default pinecone