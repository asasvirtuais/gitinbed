import { PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone'
import fs from 'fs/promises'
import { EmbedResponse } from 'voyageai/api'
import { create, destroy, update } from './pinecone'
import { embed } from './voyage'

const read = (path: string) => fs.readFile(path, 'utf-8')

const mapToCone = (path: string) => (embed: EmbedResponse): PineconeRecord<RecordMetadata> => ({
	id: path,
	metadata: {
		model: embed.model as string,
		usage: embed.usage?.totalTokens as number,
		index: embed?.data?.[0]?.index as number,
	},
	values: embed.data?.[0]?.embedding as number[]
})

export default async function main(created: string[] = [], updated: string[] = [], removed: string[] = []) {
	await Promise.all([
		Promise.all(
			created.map(
				path => read(path)
					.then(embed)
					.then(mapToCone(path))
			)
		).then(create),
		Promise.all(
			updated.map(
				path => read(path)
					.then(embed)
					.then(mapToCone(path))
			)
		).then(res => res.map(update)),
		destroy(removed)
	])
}
