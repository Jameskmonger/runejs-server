import { npcAction } from '@server/world/actor/player/action/npc-action';
import { ActionType, RunePlugin } from '@server/plugins/plugin';
import { npcIds } from '@server/world/config/npc-ids';
import { animationIds } from '@server/world/config/animation-ids';
import { dialogue, Emote, execute } from '@server/world/actor/dialogue';

const action: npcAction = (details) => {
    const { player, npc } = details;

    let sadEnding = false;

    dialogue([ player, { npc, key: 'hans' }], [
        hans => [ Emote.GENERIC, `Welcome to RuneScape!` ],
        hans => [ Emote.HAPPY, `How do you feel about Rune.JS so far?\n` +
            `Please take a moment to let us know what you think!` ],
        () => ({
            'Love it!': [
                player => [ Emote.HAPPY, `Loving it so far, thanks for asking!` ],
                hans => [ Emote.HAPPY, `You're very welcome! Glad to hear it.` ]
            ],
            'Kind of cool.': [
                player => [ Emote.GENERIC, `It's kind of cool, I guess. Bit of a weird gimmick.` ],
                hans => [ Emote.HAPPY, `Please let us know if you have any suggestions.` ]
            ],
            'Eh, I don\'t know...': [
                player => [ Emote.SKEPTICAL, `Ehhh... I don't know...` ],
                hans => [ Emote.GENERIC, `We're always open to feedback or Pull Requests anytime you like.` ],
                player => [ Emote.GENERIC, `I'll keep that in mind, thanks.` ]
            ],
            'Not my cup of tea, honestly.': [
                player => [ Emote.SKEPTICAL, `Not really my cup of tea, but keep at it.` ],
                hans => [ Emote.GENERIC, `Thanks for the support!` ]
            ],
            'It\'s literally the worst.': [
                player => [ Emote.ANGRY, `Literally the worst thing I've ever seen. You disgust me on a personal level.` ],
                hans => [ Emote.SAD, `I-is that so?... Well I'm... I'm sorry to hear that.` ],
                execute(() => sadEnding = true)
            ]
        }),
        execute(() => {
            npc.clearFaceActor();
            player.clearFaceActor();

            if(sadEnding) {
                npc.playAnimation(animationIds.cry);
                npc.say(`Jerk!`);
                player.sendMessage(`Hans wanders off rather dejectedly.`);
            } else {
                player.sendMessage(`Hans wanders off aimlessly through the courtyard.`);
            }
        })
    ]);
};

export default new RunePlugin({ type: ActionType.NPC_ACTION, npcIds: npcIds.hans, options: 'talk-to', walkTo: true, action });
