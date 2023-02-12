import { ActorTask } from "@engine/task/impl";
import { Player, Skill } from "@engine/world/actor";
import { animationIds, soundIds } from "@engine/world/config";
import { Spinnable } from './types';

/**
 * A task that handles the spinning wheel.
 */
export class SpinningWheelTask extends ActorTask<Player> {
    private elapsedTicks = 0;
    private amountCrafted = 0;

    constructor(player: Player, private spinnable: Spinnable, private readonly amountWanted: number) {
        super(player);
    }

    public execute(): void {
        const taskIteration = this.elapsedTicks++;

        // completed the task if we've made the amount we wanted
        if (this.amountCrafted >= this.amountWanted) {
            this.stop();
            return;
        }

        const material = this.getMaterial();

        if (!material) {
            this.actor.sendMessage(`You don't have any materials.`);
            this.stop();
            return;
        }

        // Spinning takes 3 ticks for each item
        if (taskIteration % 3 === 0) {
            this.actor.removeFirstItem(material);
            this.actor.giveItem(this.spinnable.output);
            this.actor.skills.addExp(Skill.CRAFTING, this.spinnable.experience);
            this.amountCrafted++;
        }

        // animation plays once every two items
        if (taskIteration % 6 === 0) {
            this.actor.playAnimation(animationIds.spinSpinningWheel);
            this.actor.outgoingPackets.playSound(soundIds.spinWool, 5);
        }
    }

    /**
     * Some recipes accept multiple materials, this method will return a valid material.
     */
    private getMaterial(): number | null {
        if (Array.isArray(this.spinnable.input)) {
            for (const item of this.spinnable.input) {
                if (this.actor.inventory.has(item)) {
                    return item;
                }
            }

            return null;
        }

        if (this.actor.inventory.has(this.spinnable.input)) {
            return this.spinnable.input;
        }

        return null;
    }
}
