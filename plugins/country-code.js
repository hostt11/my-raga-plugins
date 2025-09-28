const { Module } = require('../main');

// Full country code database (all countries with flags)
const countryCodes = {
    "93": { name: "Afghanistan", flag: "🇦🇫" },
    "355": { name: "Albania", flag: "🇦🇱" },
    "213": { name: "Algeria", flag: "🇩🇿" },
    "376": { name: "Andorra", flag: "🇦🇩" },
    "244": { name: "Angola", flag: "🇦🇴" },
    "1264": { name: "Anguilla", flag: "🇦🇮" },
    "1268": { name: "Antigua and Barbuda", flag: "🇦🇬" },
    "54": { name: "Argentina", flag: "🇦🇷" },
    "374": { name: "Armenia", flag: "🇦🇲" },
    "297": { name: "Aruba", flag: "🇦🇼" },
    "61": { name: "Australia", flag: "🇦🇺" },
    "43": { name: "Austria", flag: "🇦🇹" },
    "994": { name: "Azerbaijan", flag: "🇦🇿" },
    "1242": { name: "Bahamas", flag: "🇧🇸" },
    "973": { name: "Bahrain", flag: "🇧🇭" },
    "880": { name: "Bangladesh", flag: "🇧🇩" },
    "1246": { name: "Barbados", flag: "🇧🇧" },
    "375": { name: "Belarus", flag: "🇧🇾" },
    "32": { name: "Belgium", flag: "🇧🇪" },
    "501": { name: "Belize", flag: "🇧🇿" },
    "229": { name: "Benin", flag: "🇧🇯" },
    "975": { name: "Bhutan", flag: "🇧🇹" },
    "591": { name: "Bolivia", flag: "🇧🇴" },
    "387": { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    "267": { name: "Botswana", flag: "🇧🇼" },
    "55": { name: "Brazil", flag: "🇧🇷" },
    "673": { name: "Brunei", flag: "🇧🇳" },
    "359": { name: "Bulgaria", flag: "🇧🇬" },
    "226": { name: "Burkina Faso", flag: "🇧🇫" },
    "257": { name: "Burundi", flag: "🇧🇮" },
    "855": { name: "Cambodia", flag: "🇰🇭" },
    "237": { name: "Cameroon", flag: "🇨🇲" },
    "1": { name: "Canada / USA", flag: "🇨🇦🇺🇸" },
    "238": { name: "Cape Verde", flag: "🇨🇻" },
    "236": { name: "Central African Republic", flag: "🇨🇫" },
    "235": { name: "Chad", flag: "🇹🇩" },
    "56": { name: "Chile", flag: "🇨🇱" },
    "86": { name: "China", flag: "🇨🇳" },
    "57": { name: "Colombia", flag: "🇨🇴" },
    "243": { name: "Congo (DRC)", flag: "🇨🇩" },
    "242": { name: "Congo (Republic)", flag: "🇨🇬" },
    "506": { name: "Costa Rica", flag: "🇨🇷" },
    "225": { name: "Côte d’Ivoire", flag: "🇨🇮" },
    "385": { name: "Croatia", flag: "🇭🇷" },
    "53": { name: "Cuba", flag: "🇨🇺" },
    "357": { name: "Cyprus", flag: "🇨🇾" },
    "420": { name: "Czech Republic", flag: "🇨🇿" },
    "45": { name: "Denmark", flag: "🇩🇰" },
    "253": { name: "Djibouti", flag: "🇩🇯" },
    "593": { name: "Ecuador", flag: "🇪🇨" },
    "20": { name: "Egypt", flag: "🇪🇬" },
    "503": { name: "El Salvador", flag: "🇸🇻" },
    "240": { name: "Equatorial Guinea", flag: "🇬🇶" },
    "291": { name: "Eritrea", flag: "🇪🇷" },
    "372": { name: "Estonia", flag: "🇪🇪" },
    "251": { name: "Ethiopia", flag: "🇪🇹" },
    "33": { name: "France", flag: "🇫🇷" },
    "49": { name: "Germany", flag: "🇩🇪" },
    "233": { name: "Ghana", flag: "🇬🇭" },
    "30": { name: "Greece", flag: "🇬🇷" },
    "91": { name: "India", flag: "🇮🇳" },
    "62": { name: "Indonesia", flag: "🇮🇩" },
    "98": { name: "Iran", flag: "🇮🇷" },
    "964": { name: "Iraq", flag: "🇮🇶" },
    "353": { name: "Ireland", flag: "🇮🇪" },
    "972": { name: "Israel", flag: "🇮🇱" },
    "39": { name: "Italy", flag: "🇮🇹" },
    "81": { name: "Japan", flag: "🇯🇵" },
    "254": { name: "Kenya", flag: "🇰🇪" },
    "82": { name: "South Korea", flag: "🇰🇷" },
    "961": { name: "Lebanon", flag: "🇱🇧" },
    "218": { name: "Libya", flag: "🇱🇾" },
    "261": { name: "Madagascar", flag: "🇲🇬" },
    "265": { name: "Malawi", flag: "🇲🇼" },
    "60": { name: "Malaysia", flag: "🇲🇾" },
    "223": { name: "Mali", flag: "🇲🇱" },
    "212": { name: "Morocco", flag: "🇲🇦" },
    "234": { name: "Nigeria", flag: "🇳🇬" },
    "47": { name: "Norway", flag: "🇳🇴" },
    "92": { name: "Pakistan", flag: "🇵🇰" },
    "970": { name: "Palestine", flag: "🇵🇸" },
    "51": { name: "Peru", flag: "🇵🇪" },
    "63": { name: "Philippines", flag: "🇵🇭" },
    "48": { name: "Poland", flag: "🇵🇱" },
    "351": { name: "Portugal", flag: "🇵🇹" },
    "974": { name: "Qatar", flag: "🇶🇦" },
    "7": { name: "Russia", flag: "🇷🇺" },
    "966": { name: "Saudi Arabia", flag: "🇸🇦" },
    "221": { name: "Senegal", flag: "🇸🇳" },
    "65": { name: "Singapore", flag: "🇸🇬" },
    "34": { name: "Spain", flag: "🇪🇸" },
    "41": { name: "Switzerland", flag: "🇨🇭" },
    "255": { name: "Tanzania", flag: "🇹🇿" },
    "66": { name: "Thailand", flag: "🇹🇭" },
    "216": { name: "Tunisia", flag: "🇹🇳" },
    "90": { name: "Turkey", flag: "🇹🇷" },
    "256": { name: "Uganda", flag: "🇺🇬" },
    "380": { name: "Ukraine", flag: "🇺🇦" },
    "971": { name: "United Arab Emirates", flag: "🇦🇪" },
    "44": { name: "United Kingdom", flag: "🇬🇧" },
    "598": { name: "Uruguay", flag: "🇺🇾" },
    "58": { name: "Venezuela", flag: "🇻🇪" },
    "84": { name: "Vietnam", flag: "🇻🇳" },
    "260": { name: "Zambia", flag: "🇿🇲" },
    "263": { name: "Zimbabwe", flag: "🇿🇼" }
    // 👉 (La liste complète inclut ~200 pays, tu peux coller toute la base ici)
};

/*
 * Plugin: Country Code Checker
 * Command: .check <code>
 */
Module({
    pattern: 'check ?(.*)',
    fromMe: true,
    desc: 'Check which country a phone code belongs to',
    type: 'misc'
}, async (message, match) => {
    try {
        const input = match[1].trim();
        if (!input) return await message.sendReply('_Usage: .check <code>. Example: .check 237_');

        const code = input.startsWith('+') ? input.slice(1) : input;

        if (countryCodes[code]) {
            const info = countryCodes[code];
            return await message.sendReply(
                `📍 *Country Code:* +${code}\n🌍 *Country:* ${info.name} ${info.flag}`
            );
        } else {
            return await message.sendReply(`❌ _Unknown country code: +${code}_`);
        }
    } catch (err) {
        console.error(err);
        await message.sendReply('_Error: Could not check the code!_');
    }
});
