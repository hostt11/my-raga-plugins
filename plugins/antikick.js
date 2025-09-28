const { Module } = require('../main');
const config = require('../config');

// Anti-number storage (in memory)
let antiCodes = {};

/*
 * Plugin: Anti Country Code
 * Command: .anti <code> | .anti off <code> | .anti list | .anti clear
 * Example: .anti 92
 * Owner and sudo only
 */
Module({
    pattern: 'anti ?(.*)',
    fromMe: true, // owner & sudo only
    desc: 'Kick users with specific country codes when they join',
    type: 'group'
}, async (message, match) => {
    try {
        if (!message.isGroup) {
            return await message.sendReply('_This command must be used in a group!_');
        }

        const input = match[1].trim();
        const jid = message.jid;

        if (!antiCodes[jid]) {
            antiCodes[jid] = [];
        }

        // LIST all codes
        if (input.toLowerCase() === 'list') {
            if (antiCodes[jid].length === 0) {
                return await message.sendReply('_No anti codes set for this group._');
            }
            return await message.sendReply(
                `_Anti codes active in this group:_\n+${antiCodes[jid].join(', +')}`
            );
        }

        // CLEAR all codes
        if (input.toLowerCase() === 'clear') {
            antiCodes[jid] = [];
            return await message.sendReply('_All anti codes cleared for this group._');
        }

        // Disable a code
        if (input.toLowerCase().startsWith('off')) {
            const code = input.replace('off', '').trim();
            if (!code) {
                return await message.sendReply('_Provide a code to disable. Example: .anti off 92_');
            }
            const normalizedCode = code.startsWith('+') ? code.slice(1) : code;
            antiCodes[jid] = antiCodes[jid].filter(c => c !== normalizedCode);
            return await message.sendReply(`_Anti code +${normalizedCode} has been disabled._`);
        }

        // Enable a code
        if (!input) {
            return await message.sendReply('_Provide a country code! Example: .anti 92_');
        }

        const normalizedCode = input.startsWith('+') ? input.slice(1) : input;

        if (!antiCodes[jid].includes(normalizedCode)) {
            antiCodes[jid].push(normalizedCode);
        }

        await message.sendReply(
            `_Anti set successfully! Users with code +${normalizedCode} will be kicked automatically._`
        );
    } catch (error) {
        console.error(error);
        await message.sendReply('_Error: could not process anti command!_');
    }
});

/*
 * Event: Group update listener
 * Action: Kick users whose number starts with restricted codes
 */
Module({
    on: 'group-update',
    fromMe: false
}, async (message) => {
    try {
        const jid = message.jid;

        // If no anti codes set for this group, skip
        if (!antiCodes[jid] || antiCodes[jid].length === 0) return;

        // Check if new participants joined
        if (message.action === 'add' && message.participants) {
            for (let user of message.participants) {
                const userNumber = user.split('@')[0];

                // Check against all restricted codes
                for (let code of antiCodes[jid]) {
                    if (userNumber.startsWith(code)) {
                        // Kick the user
                        await message.client.groupParticipantsUpdate(jid, [user], 'remove');
                        await message.sendReply(
                            `_User with number +${userNumber} has been removed (anti ${code})._`
                        );
                        break;
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
});
