#!/usr/bin/env node
import './logger'
import 'dotenv/config'
import main from './main'

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

export { main }
