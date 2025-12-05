import { Events } from 'discord.js'

export default {
    name: Events.GuildMemberAdd,

    async execute(member) {
        if (member.bot) {
            return
        }
        const roles = [
            '1442854199376482488',
            '1442995625397587968',
            '1442996152386719804',
            '1442996156530688120',
            '1442996159483220183',
            '1442996162767622244',
            '1442996165602709605'
        ]

        await member.roles.add(roles)
    }
}