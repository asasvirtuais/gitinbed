import { VoyageAIClient } from 'voyageai'

const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY })

export function embed(input: string, isBase64: boolean = false) {
	return voyage.embed({
		model: process.env.VOYAGE_MODEL as string,
		input,
		inputType: 'document',
		...(isBase64 ? { encodingFormat: 'base64' } : {})
	})
}

export default voyage