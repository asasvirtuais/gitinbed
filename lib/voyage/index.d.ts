import { VoyageAIClient } from 'voyageai';
declare const voyage: VoyageAIClient;
export declare function embed(input: string, isBase64?: boolean): Promise<import("voyageai/api").EmbedResponse>;
export default voyage;
