import { ButtonActionHook } from '@engine/action';
import { Player } from '@engine/world/actor/player/player';
import { Position } from '@engine/world/position';
import { animationIds } from '@engine/world/config/animation-ids';
import { soundIds } from '@engine/world/config/sound-ids';
import { gfxIds } from '@engine/world/config/gfx-ids';
import { ActorTask } from '@engine/task/impl';

enum Teleports {
    Home = 591,
    Varrock = 12,
    Lumbridge = 15,
    Falador = 18,
    Camelot = 22,
    Ardougne = 388,
    Watchtower = 389,
    Trollheim = 492,
    Ape_atoll = 569
}

const buttonIds: number[] = [
    591, // Home Teleport
];

function homeTeleport(player: Player, elapsedTicks: number): boolean {
    if (elapsedTicks === 0) {
        player.playAnimation(animationIds.homeTeleportDraw);
        player.playGraphics({ id: gfxIds.homeTeleportDraw, delay: 0, height: 0 });
        player.outgoingPackets.playSound(soundIds.homeTeleportDraw, 10);
    } else if (elapsedTicks === 7) {
        player.playAnimation(animationIds.homeTeleportSit);
        player.playGraphics({ id: gfxIds.homeTeleportFullDrawnCircle, delay: 0, height: 0 });
        player.outgoingPackets.playSound(soundIds.homeTeleportSit, 10);
    } else if (elapsedTicks === 12) {
        player.playAnimation(animationIds.homeTeleportPullOutAndReadBook);
        player.playGraphics({ id: gfxIds.homeTeleportPullOutBook, delay: 0, height: 0 });
        player.outgoingPackets.playSound(soundIds.homeTeleportPullOutBook, 10);
    } else if (elapsedTicks === 16) {
        player.playAnimation(animationIds.homeTeleportReadBookAndGlowCircle);
        player.playGraphics({ id: gfxIds.homeTeleportCircleGlow, delay: 0, height: 0 });
        player.outgoingPackets.playSound(soundIds.homeTeleportCircleGlowAndTeleport, 10);
    } else if (elapsedTicks === 20) {
        player.playAnimation(animationIds.homeTeleport);
        player.playGraphics({ id: gfxIds.homeTeleport, delay: 0, height: 0 });
    } else if (elapsedTicks === 22) {
        player.teleport(new Position(3218, 3218));
        return true;
    }

    return false;
}

class MagicButtonTeleportTask extends ActorTask<Player> {
    private elapsedTicks = 0;

    public constructor(player: Player, private buttonId: number) {
        super(player);
    }

    public execute(): void {
        let completed: boolean = false;

        switch (this.buttonId) {
            case Teleports.Home:
                completed = homeTeleport(this.actor, this.elapsedTicks++);
                break;
            default:
                completed = true;
                break;
        }

        if(completed) {
            this.stop();
        }
    }
}

export default {
    pluginId: 'rs:magic_teleports',
    hooks: [
        {
            type: 'button',
            widgetId: 192,
            buttonIds: buttonIds,
            handler: ({ player, buttonId }) => {
                player.enqueueTask(MagicButtonTeleportTask, [ buttonId ]);
            }
        } as ButtonActionHook
    ]
};
