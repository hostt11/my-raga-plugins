const { Module } = require('../main');

Module({
    pattern: 'demoteall',
    fromMe: true, // réservé au propriétaire
    desc: 'Removes the admin role from everyone except the owner',
    type: 'group'
}, async (message) => {
    try {
        // Vérifier si c'est bien dans un groupe
        if (!message.isGroup) {
            return await message.sendReply('_This command must be used in a group!_');
        }

        // Récupérer les infos du groupe
        const groupMetadata = await message.client.groupMetadata(message.jid);
        const participants = groupMetadata.participants;

        // Trouver tous les admins sauf celui qui exécute
        const admins = participants
            .filter(p => p.admin) // garder seulement les admins
            .map(p => p.id)       // extraire les ID

        const targetAdmins = admins.filter(id => id !== message.sender);

        if (targetAdmins.length === 0) {
            return await message.sendReply('_There are no other admins to downgrade !_');
        }

        // Rétrograder tout le monde sauf toi
        await message.client.groupParticipantsUpdate(message.jid, targetAdmins, 'demote');

        await message.sendReply(`_All admins have been downgraded, except you._`);
    } catch (error) {
        console.error(error);
        await message.sendReply('_Erreur : Impossible to downgrade the admins !_');
    }
});
