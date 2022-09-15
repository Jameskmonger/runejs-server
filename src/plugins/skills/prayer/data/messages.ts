import { PrayerDetail } from '../types';

export const prayerLevelTooLow = (prayer: PrayerDetail) => {
    return `You need a Prayer level of ${prayer.level} to use ${prayer.name}.`;
};

export const runOutOfPrayerPoints = 'You have run out of prayer points. You can recharge at an altar.';
