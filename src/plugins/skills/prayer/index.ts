import { ButtonActionHook, PlayerInitActionHook } from '@engine/action';
import { widgets } from '@engine/config';
import { prayerDetails } from './data/prayers';
import { PrayerDrainTask } from './prayer-task';
import { togglePrayer } from './toggle';
import { ActivePlayerPrayers } from './types';

export default {
    pluginId: 'rs:prayer_jkm',
    hooks: [
        /**
         * Initialise the player's prayer state and start the prayer drain task.
         */
        {
            type: 'player_init',
            handler: ({ player }) => {
                // split these out into two lines because `ActivePlayerPrayers` is quite a complex type
                // and `metadata` has no type information, so this gives us some type safety
                const activePrayers: ActivePlayerPrayers = new Map();
                player.metadata.activePrayers = activePrayers;

                player.metadata.prayerDrainCounter = 0;

                player.enqueueTask(PrayerDrainTask);
            }
        } as PlayerInitActionHook,
        {
            type: 'button',
            buttonIds: prayerDetails.map(p => p.buttonId),
            widgetId: widgets.prayerTab,
            handler: ({ player, buttonId }) => {
                console.log(`Player ${player.username} clicked prayer button ${buttonId}`);

                const prayer = prayerDetails.find(p => p.buttonId === buttonId);

                if (!prayer) {
                    return;
                }

                togglePrayer(player, prayer);
            }
        } as ButtonActionHook
    ]
};
