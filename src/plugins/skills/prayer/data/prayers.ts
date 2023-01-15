import { soundIds } from '@engine/world/config';
import { PrayerDetail, PrayerGroup } from '../types';

// config IDs (prayers enabled)

// 83 - thick skin
// 84 - burst of strength
// 85 - clarity of thought

// 99 - redemption
// 100 - smite

// 862 - sharp eye
// 863 - mystic will
// 864 - hawk eye
// 865 - mystic lore
// 866 - eagle eye
// 867 - mystic might

// var prayers = [
//     // [index - prayer or curse? - name - image filename suffix - drain rate per game tick - {indexes of incompatible prayers} - currently active or not?]
//     [0,'prayer','Thick Skin','thick_skin',(10/12),{5:0,13:0,25:0,27:0,28:0,29:0},0],
//     [1,'prayer','Burst of Strength','burst_of_strength',(10/12),{3:0,4:0,6:0,11:0,12:0,14:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [2,'prayer','Clarity of Thought','clarity_of_thought',(10/12),{3:0,4:0,7:0,11:0,12:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [3,'prayer','Sharp Eye','sharp_eye',(10/12),{1:0,2:0,4:0,6:0,7:0,11:0,12:0,14:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [4,'prayer','Mystic Will','mystic_will',(10/12),{1:0,2:0,3:0,6:0,7:0,11:0,12:0,14:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [5,'prayer','Rock Skin','rock_skin',(10/6),{0:0,13:0,25:0,27:0,28:0,29:0},0],
//     [6,'prayer','Superhuman Strength','superhuman_strength',(10/6),{1:0,3:0,4:0,11:0,12:0,14:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [7,'prayer','Improved Reflexes','improved_reflexes',(10/6),{2:0,3:0,4:0,11:0,12:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [8,'prayer','Rapid Restore','rapid_restore',(10/36),{},0],
//     [9,'prayer','Rapid Heal','rapid_heal',(10/18),{},0],
//     [10,'prayer','Protect Item','protect_item',(10/18),{},0],
//     [11,'prayer','Hawk Eye','hawk_eye',(10/6),{1:0,2:0,3:0,4:0,6:0,7:0,12:0,14:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [12,'prayer','Mystic Lore','mystic_lore',(10/6),{1:0,2:0,3:0,4:0,6:0,7:0,11:0,14:0,15:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [13,'prayer','Steel Skin','steel_skin',(10/3),{0:0,5:0,25:0,27:0,28:0,29:0},0],
//     [14,'prayer','Ultimate Strength','ultimate_strength',(10/3),{1:0,3:0,4:0,6:0,11:0,12:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [15,'prayer','Incredible Reflexes','incredible_reflexes',(10/3),{2:0,3:0,4:0,7:0,11:0,12:0,20:0,21:0,25:0,27:0,28:0,29:0},0],
//     [16,'prayer','Protect from Summoning','protect_from_summoning',(10/3),{22:0,23:0,24:0},0],
//     [17,'prayer','Protect from Magic','protect_from_magic',(10/3),{18:0,19:0,22:0,23:0,24:0},0],
//     [18,'prayer','Protect from Missiles','protect_from_missiles',(10/3),{17:0,19:0,22:0,23:0,24:0},0],
//     [19,'prayer','Protect from Melee','protect_from_melee',(10/3),{17:0,18:0,22:0,23:0,24:0},0],
//     [20,'prayer','Eagle Eye','eagle_eye',(10/3),{1:0,2:0,3:0,4:0,6:0,7:0,11:0,12:0,14:0,15:0,21:0,25:0,27:0,28:0,29:0},0],
//     [21,'prayer','Mystic Might','mystic_might',(10/3),{1:0,2:0,3:0,4:0,6:0,7:0,11:0,12:0,14:0,15:0,20:0,25:0,27:0,28:0,29:0},0],
//     [22,'prayer','Retribution','retribution',(10/12),{16:0,17:0,18:0,19:0,23:0,24:0},0],
//     [23,'prayer','Redemption','redemption',(10/6),{16:0,17:0,18:0,19:0,22:0,24:0},0],
//     [24,'prayer','Smite','smite',(10/1.8),{16:0,17:0,18:0,19:0,22:0,23:0},0],
//     [25,'prayer','Chivalry','chivalry',(10/1.8),{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,11:0,12:0,13:0,14:0,15:0,20:0,21:0,27:0,28:0,29:0},0],
//     [26,'prayer','Rapid Renewal','rapid_renewal',(10/2.4),{},0],
//     [27,'prayer','Piety','piety',(10/1.5),{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,11:0,12:0,13:0,14:0,15:0,20:0,21:0,25:0,28:0,29:0},0],
//     [28,'prayer','Rigour','rigour',(5),{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,11:0,12:0,13:0,14:0,15:0,20:0,21:0,25:0,27:0,29:0},0],
//     [29,'prayer','Augury','augury',(10/1.8),{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,11:0,12:0,13:0,14:0,15:0,20:0,21:0,25:0,27:0,28:0},0],
//     [30,'curse','Protect Item','protect_item_curse',(10/18),{},0],
//     [31,'curse','Sap Warrior','sap_warrior',(10/2.4),{40:0,41:0,42:0,43:0,44:0,45:0,46:0,49:0},0],
//     [32,'curse','Sap Ranger','sap_ranger',(10/2.4),{40:0,41:0,42:0,43:0,44:0,45:0,46:0,49:0},0],
//     [33,'curse','Sap Mage','sap_mage',(10/2.4),{40:0,41:0,42:0,43:0,44:0,45:0,46:0,49:0},0],
//     [34,'curse','Sap Spirit','sap_spirit',(10/2.4),{40:0,41:0,42:0,43:0,44:0,45:0,46:0,49:0},0],
//     [35,'curse','Berserker','berserker',(10/18),{},0],
//     [36,'curse','Deflect Summoning','deflect_summoning',(10/3),{47:0,48:0},0],
//     [37,'curse','Deflect Magic','deflect_magic',(10/3),{38:0,39:0,47:0,48:0},0],
//     [38,'curse','Deflect Missiles','deflect_missiles',(10/3),{37:0,39:0,47:0,48:0},0],
//     [39,'curse','Deflect Melee','deflect_melee',(10/3),{37:0,38:0,47:0,48:0},0],
//     [40,'curse','Leech Attack','leech_attack',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [41,'curse','Leech Ranged','leech_ranged',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [42,'curse','Leech Magic','leech_magic',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [43,'curse','Leech Defence','leech_defence',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [44,'curse','Leech Strength','leech_strength',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [45,'curse','Leech Energy','leech_energy',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [46,'curse','Leech Special Attack','leech_special_attack',(10/3.6),{31:0,32:0,33:0,34:0,49:0},0],
//     [47,'curse','Wrath','wrath',(10/12),{36:0,37:0,38:0,39:0,48:0},0],
//     [48,'curse','Soul Split','soul_split',(5),{36:0,37:0,38:0,39:0,47:0},0],

export const prayerDetails: PrayerDetail[] = [
    {
        key: 'thick_skin',
        name: 'Thick Skin',
        level: 1,
        buttonId: 0,
        soundId: soundIds.prayer.thick_skin,
        configId: 83,
        drainRate: (5 / 6),
        group: PrayerGroup.DEFENCE
    },
    {
        key: 'burst_of_strength',
        name: 'Burst of Strength',
        level: 4,
        buttonId: 1,
        soundId: soundIds.prayer.burst_of_strength,
        configId: 84,
        drainRate: (5 / 6),
        group: PrayerGroup.STRENGTH
    },
    {
        key: 'clarity_of_thought',
        name: 'Clarity of Thought',
        level: 7,
        buttonId: 2,
        soundId: soundIds.prayer.clarity_of_thought,
        configId: 85,
        drainRate: (5 / 6),
        group: PrayerGroup.ATTACK
    },

    // TODO: Add the rest of the prayers

    {
        key: 'rock_skin',
        name: 'Rock Skin',
        level: 10,
        buttonId: 3,
        soundId: soundIds.prayer.rock_skin,
        configId: 86,
        drainRate: (5 / 6),
        group: PrayerGroup.DEFENCE
    },
    {
        key: 'superhuman_strength',
        name: 'Superhuman Strength',
        level: 13,
        buttonId: 4,
        soundId: soundIds.prayer.superhuman_strength,
        configId: 87,
        drainRate: (5 / 6),
        group: PrayerGroup.STRENGTH
    },
    {
        key: 'improved_reflexes',
        name: 'Improved Reflexes',
        level: 16,
        buttonId: 5,
        soundId: soundIds.prayer.improved_reflexes,
        configId: 88,
        drainRate: (5 / 6),
        group: PrayerGroup.ATTACK
    },
];
