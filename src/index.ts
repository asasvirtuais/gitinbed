#!/usr/bin/env node
import './logger'
import 'dotenv/config'
import main from './main'

// Process command-line arguments
const args = process.argv.slice(2)
logger.trace('Args received:', process.argv)
const created: string[] = []
const updated: string[] = []
const removed: string[] = []

for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    if (arg.startsWith('--')) {
        const flag = arg.slice(2)
        i++ // Move to the next argument, which should be the value
        if (i >= args.length) {
            console.error(`Missing value for flag: ${flag}`)
            continue
        }
        const value = args[i]
        const files = value.split(' ').filter(Boolean)

        switch (flag) {
            case 'created':
                created.push(...files)
                break
            case 'updated':
                updated.push(...files)
                break
            case 'removed':
                removed.push(...files)
                break
            default:
                console.error(`Unknown flag: ${flag}`)
        }
    } else {
        console.error(`Invalid argument: ${arg}`)
    }
}

logger.trace('Files created:', created)
logger.trace('Files updated:', updated)
logger.trace('Files removed:', removed)

// Call the main function with the processed file lists
main(created, updated, removed)
	.then(() => console.log('Git got embedded successfully, I guess'))
	.catch((error) => {
		console.error('An error occurred while getting git embedded:', error)
		process.exit(1)
	})
