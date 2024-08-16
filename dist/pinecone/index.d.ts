import { Pinecone, PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone';
declare const pinecone: Pinecone;
export declare const index: import("@pinecone-database/pinecone").Index<RecordMetadata>;
export declare const namespace: import("@pinecone-database/pinecone").Index<RecordMetadata>;
export declare const create: (data: PineconeRecord<RecordMetadata>[]) => Promise<void>;
export declare const update: (data: PineconeRecord<RecordMetadata>) => Promise<void>;
export declare const destroy: (ids: string[]) => Promise<void>;
export default pinecone;
