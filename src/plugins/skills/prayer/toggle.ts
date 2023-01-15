import { Player } from '@engine/world/actor';
import { logger } from '@runejs/common';
import { prayerLevelTooLow, runOutOfPrayerPoints } from './data/messages';
import { prayerDetails } from './data/prayers';
import { ActivePlayerPrayers, PrayerDetail, PrayerKey } from './types';

export function togglePrayer(player: Player, prayer: PrayerDetail) {
    // TODO remove explicit typing here
    const activePrayers: ActivePlayerPrayers = player.metadata.activePrayers;

    if (!prayer) {
        logger.warn(`Could not find prayer details for prayer key ${prayer.key}`);
        return;
    }

    const currentPrayerLevel = player.skills.prayer.level;

    if (currentPrayerLevel === 0) {
        player.sendMessage(runOutOfPrayerPoints);
        return;
    }

    const playerPrayerLevel = player.skills.getLevelForExp(player.skills.prayer.exp);

    if (playerPrayerLevel < prayer.level) {
        player.sendMessage(prayerLevelTooLow(prayer));

        // TODO should we be turning the prayer off here? or just config update?
        //      this will currently clear other prayers in the same group
        turnPrayerOff(player, prayer);
        return;
    }

    const currentPrayer = activePrayers.get(prayer.group);

    // player currently has no prayer active in this group
    if (!currentPrayer) {
        turnPrayerOn(player, prayer);
        return;
    }

    // this prayer is already active, so turn it off
    if (currentPrayer === prayer.key) {
        turnPrayerOff(player, prayer);
        return;
    }

    const currentPrayerDetails = prayerDetails.find(p => p.key === currentPrayer);
    if (!currentPrayerDetails) {
        logger.warn(`Could not find prayer details for currentPrayer key ${currentPrayer}`);
        return;
    }

    turnPrayerOff(player, currentPrayerDetails);
    turnPrayerOn(player, prayer);
}

function turnPrayerOn(player: Player, prayer: PrayerDetail) {
    player.metadata.activePrayers.set(prayer.group, prayer.key);
    player.outgoingPackets.updateClientConfig(prayer.configId, 1);
    player.playSound(prayer.soundId);
}

function turnPrayerOff(player: Player, prayer: PrayerDetail) {
    player.metadata.activePrayers.set(prayer.group, null);
    player.outgoingPackets.updateClientConfig(prayer.configId, 0);
}
