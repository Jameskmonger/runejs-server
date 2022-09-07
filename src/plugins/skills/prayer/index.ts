import { PlayerInitActionHook } from '@engine/action';
import { PrayerDrainTask } from './prayer-task';
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
        } as PlayerInitActionHook
    ]
};
