#!/usr/bin/env node

import { config } from 'dotenv'
import main from './main'

// Load environment variables from .env file
config()

// Ensure required environment variables are set (thanks Claude)
const requiredEnvVars = ['VOYAGE_MODEL', 'PINECONE_INDEX', 'PINECONE_NAMESPACE', 'PINECONE_API_KEY', 'VOYAGE_API_KEY']
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.error(`Error: ${envVar} is not set in the environment`)
		process.exit(1)
	}
}

// Process command-line arguments
const args = process.argv.slice(2)
const created: string[] = []
const updated: string[] = []
const removed: string[] = []

for (let i = 0; i < args.length; i += 2) {
	const flag = args[i]
	const files = args[i + 1] ? args[i + 1].split(',').filter(Boolean) : []

	switch (flag) {
		case '--created':
			created.push(...files)
			break
		case '--updated':
			updated.push(...files)
			break
		case '--removed':
			removed.push(...files)
			break
	}
}

// Call the main function with the processed file lists
main(created, updated, removed)
	.then(() => console.log('Git got embedded successfully, I guess'))
	.catch((error) => {
		console.error('An error occurred while getting git embedded:', error)
		process.exit(1)
	})