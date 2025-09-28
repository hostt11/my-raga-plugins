const { Module } = require('../main');
const fs = require('fs');
const path = require('path');

/*
 * Plugin: Get Command Code
 * Command: .getcmd <commandName>
 * Owner/Sudo only
 */
Module({
    pattern: 'getcmd ?(.*)',
    fromMe: true,
    desc: 'Get the source code of a command/plugin',
    type: 'owner'
}, async (message, match) => {
    try {
        const input = match[1]?.trim();
        if (!input) return await message.sendReply('_Usage: .getcmd <commandName>_');

        // Path to plugins folder (adjust if different)
        const pluginsFolder = path.join(__dirname);

        // Find JS file that contains the pattern
        const files = fs.readdirSync(pluginsFolder).filter(f => f.endsWith('.js'));
        let foundFile = null;

        for (let file of files) {
            const content = fs.readFileSync(path.join(pluginsFolder, file), 'utf-8');
            if (content.includes(`pattern: '${input}`) || content.includes(`pattern: "${input}`)) {
                foundFile = path.join(pluginsFolder, file);
                break;
            }
        }

        if (!foundFile) {
            return await message.sendReply(`❌ No command found matching "${input}"`);
        }

        // Send file as document
        await message.client.sendMessage(message.jid, {
            document: { path: foundFile },
            fileName: path.basename(foundFile),
            mimetype: 'application/javascript'
        });

    } catch (error) {
        console.error(error);
        await message.sendReply('_❌ Error: Could not fetch command code_');
    }
});
