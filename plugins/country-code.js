const { Module } = require('../main');
const axios = require('axios');

/**
 * Convert ISO Alpha-2 country code to emoji flag
 * @param {string} countryCode - ISO Alpha-2 (ex: CM, FR)
 * @returns {string} Emoji flag
 */
function getFlagEmoji(countryCode) {
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

/**
 * Convert numbers in string to emoji numbers
 * @param {string} numStr
 * @returns {string}
 */
function toEmojiNumber(numStr) {
    const numberEmoji = { "0":"0️⃣","1":"1️⃣","2":"2️⃣","3":"3️⃣","4":"4️⃣","5":"5️⃣","6":"6️⃣","7":"7️⃣","8":"8️⃣","9":"9️⃣" };
    return numStr.split('').map(d => numberEmoji[d] || d).join('');
}

/*
 * Plugin: Country Code Checker
 * Command: .check <code>
 * Example: .check 237 or .check +237
 * Owner/sudo only
 */
Module({
    pattern: 'check ?(.*)',
    fromMe: true, // owner/sudo only
    desc: 'Check which country a phone code belongs to (with flag)',
    type: 'misc'
}, async (message, match) => {
    try {
        const input = match[1]?.trim();
        if (!input) return await message.sendReply('_Usage: .check <code>. Example: .check 237_');

        // Normalize code (remove + if present)
        const code = input.startsWith('+') ? input.slice(1) : input;
        const codeEmoji = toEmojiNumber(code);

        // Fetch all countries from REST Countries API
        const url = "https://restcountries.com/v2/all";
        const { data } = await axios.get(url);

        // Filter countries whose callingCodes include the given code
        const matchingCountries = data.filter(
            country => country.callingCodes && country.callingCodes.includes(code)
        );

        if (matchingCountries.length > 0) {
            const countryNames = matchingCountries
                .map(c => `${getFlagEmoji(c.alpha2Code)} ${c.name}`)
                .join("\n");
            await message.sendReply(
                `✅ *Country Code:* +${codeEmoji}\n🌍 *Countries*:\n${countryNames}`
            );
        } else {
            await message.sendReply(`❌ No country found for the code +${codeEmoji}.`);
        }
    } catch (error) {
        console.error(error);
        await message.sendReply("❌ An error occurred while checking the country code.");
    }
});
