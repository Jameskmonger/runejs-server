import { ActorTask } from '@engine/task/impl';
import { Player, Skill } from '@engine/world/actor';
import { logger } from '@runejs/common';
import { prayerDetails } from './data/prayers';
import { ActivePlayerPrayers } from './types';

/**
 * A task that handles prayer drain for a player.
 *
 * Every tick, the drain rate for each active prayer is applied to the player's cumulative 'prayer drain counter'.
 * When this counter reaches the 'drain resistance' (a function of the player's prayer bonus), the player loses a prayer point.
 *
 * https://oldschool.runescape.wiki/w/Prayer#Prayer_drain_mechanics
 *
 * @author jameskmonger
 */
export class PrayerDrainTask extends ActorTask<Player> {
    public execute() {
        if (!this.isActive) {
            return;
        }

        const prayerLevel = this.actor.skills.getLevel(Skill.PRAYER);
        if (prayerLevel < 1) {
            return;
        }

        for (const prayerKey of this.activePrayers.values()) {
            if (!prayerKey) {
                continue;
            }

            const prayerDetail = prayerDetails.find((detail) => detail.key === prayerKey);
            if (!prayerDetail) {
                logger.warn(`Could not find prayer detail for prayer key ${prayerKey}`);
                continue;
            }

            this.prayerDrainCounter += prayerDetail.drainRate;
        }

        // the player's prayer level is only reduced when the prayer drain counter surpasses the drain resistance
        if (this.prayerDrainCounter < this.drainResistance) {
            return;
        }

        this.prayerDrainCounter -= this.drainResistance;

        this.actor.skills.prayer.level -= 1;
        this.actor.outgoingPackets.updateSkill(Skill.PRAYER, this.actor.skills.prayer.level, this.actor.skills.prayer.exp);
    }

    /**
     * Gets the active prayers for this player.
     *
     * @returns a {@link ActivePlayerPrayers} map for this player containing the active prayer for each prayer group.
     */
    private get activePrayers(): ActivePlayerPrayers {
        return this.actor.metadata.activePrayers;
    }

    /**
     * Get the player's current prayer drain counter.
     *
     * This can increment over many ticks, and will result in the player's prayer points being reduced
     * when this surpasses the player's prayer resistance.
     *
     * @returns The prayer drain counter.
     */
    private get prayerDrainCounter(): number {
        return this.actor.metadata.prayerDrainCounter;
    }

    /**
     * Set the player's current prayer drain counter.
     *
     * @param value The new prayer drain counter.
     */
    private set prayerDrainCounter(value: number) {
        this.actor.metadata.prayerDrainCounter = value;
    }

    /**
     * Get the current prayer drain resistance for this player based on their prayer bonus.
     *
     * @returns The prayer drain resistance.
     */
    private get drainResistance(): number {
        return 2 * this.prayerBonus + 60;
    }

    /**
     * (UNIMPLEMENTED) Gets the current prayer bonus for this player.
     *
     * TODO get the prayer bonus from equipment
     *
     * @returns The prayer bonus.
     */
    private get prayerBonus(): number {
        return 0;
    }
}
