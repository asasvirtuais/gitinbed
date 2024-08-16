import fs from 'fs/promises';
import { create, destroy, update } from './pinecone';
import { embed } from './voyage';
const read = (path) => fs.readFile(path, 'utf-8');
const mapToCone = (path) => (embed) => ({
    id: path,
    metadata: {
        model: embed.model,
        usage: embed.usage?.totalTokens,
        index: embed?.data?.[0]?.index,
    },
    values: embed.data?.[0]?.embedding
});
export default async function main(created = [], updated = [], removed = []) {
    await Promise.all([
        Promise.all(created.map(path => read(path)
            .then(embed)
            .then(mapToCone(path)))).then(create),
        Promise.all(updated.map(path => read(path)
            .then(embed)
            .then(mapToCone(path)))).then(res => res.map(update)),
        destroy(removed)
    ]);
}
