const { Module } = require('../main');
const config = require('../config');

// Anti-number storage (in memory)
let antiCodes = {};

/*
 * Plugin: Anti Country Code
 * Command: .anti <code>
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

        const code = match[1].trim();
        if (!code) {
            return await message.sendReply('_Provide a country code! Example: .anti 92_');
        }

        const jid = message.jid;

        // Normalize code (remove + if exists)
        const normalizedCode = code.startsWith('+') ? code.slice(1) : code;

        if (!antiCodes[jid]) {
            antiCodes[jid] = [];
        }

        // Add code to the group's anti list
        if (!antiCodes[jid].includes(normalizedCode)) {
            antiCodes[jid].push(normalizedCode);
        }

        await message.sendReply(
            `_Anti set successfully! Users with code +${normalizedCode} will be kicked automatically._`
        );
    } catch (error) {
        console.error(error);
        await message.sendReply('_Error: could not set anti code!_');
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
