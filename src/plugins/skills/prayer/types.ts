export enum Prayer {
    THICK_SKIN = 0,
    BURST_OF_STRENGTH = 1,
    CLARITY_OF_THOUGHT = 2,
    SHARP_EYE = 3,
    MYSTIC_WILL = 4,
    ROCK_SKIN = 5,
    SUPERHUMAN_STRENGTH = 6,
    IMPROVED_REFLEXES = 7,
    RAPID_RESTORE = 8,
    RAPID_HEAL = 9,
    PROTECT_ITEM = 10,
    HAWK_EYE = 11,
    MYSTIC_LORE = 12,
    STEEL_SKIN = 13,
    ULTIMATE_STRENGTH = 14,
    INCREDIBLE_REFLEXES = 15,
    PROTECT_FROM_MAGIC = 16,
    PROTECT_FROM_MISSILES = 17,
    PROTECT_FROM_MELEE = 18,
    EAGLE_EYE = 19,
    MYSTIC_MIGHT = 20,
    RETRIBUTION = 21,
    REDEMPTION = 22,
    SMITE = 23,
}

export type PrayerKey = 'thick_skin'
    | 'burst_of_strength'
    | 'clarity_of_thought'
    | 'sharp_eye'
    | 'mystic_will'
    | 'rock_skin'
    | 'superhuman_strength'
    | 'improved_reflexes'
    | 'rapid_restore'
    | 'rapid_heal'
    | 'protect_item'
    | 'hawk_eye'
    | 'mystic_lore'
    | 'steel_skin'
    | 'ultimate_strength'
    | 'incredible_reflexes'
    | 'protect_from_magic'
    | 'protect_from_missiles'
    | 'protect_from_melee'
    | 'eagle_eye'
    | 'mystic_might'
    | 'retribution'
    | 'redemption'
    | 'smite';

export enum PrayerGroup {
    DEFENCE = 0,
    STRENGTH = 1,
    ATTACK = 2,
    MAGE_RANGE = 3,
    OVER_HEAD = 4
}

export type PrayerDetail = {
    readonly key: PrayerKey;
    readonly name: string;
    readonly level: number;
    readonly buttonId: number;
    readonly soundId: number;
    readonly drainRate: number;
    readonly group: PrayerGroup;
};

export type ActivePlayerPrayers = Map<PrayerGroup, PrayerKey | null>;

export enum PrayerIcons {
    NONE = -1,
    PROTECT_FROM_MELEE = 0,
    PROTECT_FROM_MISSILES = 1,
    PROTECT_FROM_MAGIC = 2,
    RETRIBUTION = 3,
    SMITE = 4,
    REDEMPTION = 5,
    PROTECT_FROM_MAGIC_AND_MISSILES = 6,
}
