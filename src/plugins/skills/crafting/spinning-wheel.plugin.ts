import { objectInteractionActionHandler } from '@engine/action';
import { buttonActionHandler, ButtonAction } from '@engine/action';
import { itemIds } from '@engine/world/config/item-ids';
import { Skill } from '@engine/world/actor/skills';
import { objectIds } from '@engine/world/config/object-ids';
import { findItem, widgets } from '@engine/config/config-handler';
import { Spinnable } from './types';
import { SpinningWheelTask } from './spinning-wheel.task';

interface SpinnableButton {
    shouldTakeInput: boolean;
    count: number;
    spinnable: Spinnable;
}

const ballOfWool: Spinnable = { input: itemIds.wool, output: itemIds.ballOfWool, experience: 2.5, requiredLevel: 1 };
const bowString: Spinnable = { input: itemIds.flax, output: itemIds.bowstring, experience: 15, requiredLevel: 10 };
const rootsCbowString: Spinnable = {
    input: [
        itemIds.roots.oak,
        itemIds.roots.willow,
        itemIds.roots.maple,
        itemIds.roots.yew
    ],
    output: itemIds.crossbowString,
    experience: 15,
    requiredLevel: 10
};
const sinewCbowString: Spinnable = {
    input: itemIds.sinew,
    output: itemIds.crossbowString,
    experience: 15,
    requiredLevel: 10
};
const magicAmuletString: Spinnable = {
    input: itemIds.roots.magic,
    output: itemIds.magicString,
    experience: 30,
    requiredLevel: 19
};
const widgetButtonIds: Map<number, SpinnableButton> = new Map<number, SpinnableButton>([
    [100, { shouldTakeInput: false, count: 1, spinnable: ballOfWool }],
    [99, { shouldTakeInput: false, count: 5, spinnable: ballOfWool }],
    [98, { shouldTakeInput: false, count: 10, spinnable: ballOfWool }],
    [97, { shouldTakeInput: true, count: 0, spinnable: ballOfWool }],
    [95, { shouldTakeInput: false, count: 1, spinnable: bowString }],
    [94, { shouldTakeInput: false, count: 5, spinnable: bowString }],
    [93, { shouldTakeInput: false, count: 10, spinnable: bowString }],
    [91, { shouldTakeInput: true, count: 0, spinnable: bowString }],
    [107, { shouldTakeInput: false, count: 1, spinnable: magicAmuletString }],
    [106, { shouldTakeInput: false, count: 5, spinnable: magicAmuletString }],
    [105, { shouldTakeInput: false, count: 10, spinnable: magicAmuletString }],
    [104, { shouldTakeInput: true, count: 0, spinnable: magicAmuletString }],
    [121, { shouldTakeInput: false, count: 1, spinnable: rootsCbowString }],
    [120, { shouldTakeInput: false, count: 5, spinnable: rootsCbowString }],
    [119, { shouldTakeInput: false, count: 10, spinnable: rootsCbowString }],
    [118, { shouldTakeInput: true, count: 0, spinnable: rootsCbowString }],
    [114, { shouldTakeInput: false, count: 1, spinnable: sinewCbowString }],
    [113, { shouldTakeInput: false, count: 5, spinnable: sinewCbowString }],
    [112, { shouldTakeInput: false, count: 10, spinnable: sinewCbowString }],
    [111, { shouldTakeInput: true, count: 0, spinnable: sinewCbowString }],
]);

export const openSpinningInterface: objectInteractionActionHandler = (details) => {
    details.player.interfaceState.openWidget(widgets.whatWouldYouLikeToSpin, {
        slot: 'screen'
    });
};

const spinProduct: any = (details: ButtonAction, spinnable: Spinnable, count: number) => {
    details.player.enqueueTask(SpinningWheelTask, [ spinnable, count ]);
};

export const buttonClicked: buttonActionHandler = (details) => {
    // Check if player might be spawning widget clientside
    if (!details.player.interfaceState.findWidget(459)) {
        return;
    }
    const product = widgetButtonIds.get(details.buttonId);

    // Close the widget as it is no longer needed
    details.player.interfaceState.closeAllSlots();

    if (!details.player.skills.hasLevel(Skill.CRAFTING, product.spinnable.requiredLevel)) {
        details.player.sendMessage(`You need a crafting level of ${product.spinnable.requiredLevel} to craft ${findItem(product.spinnable.output).name.toLowerCase()}.`, true);
        return;
    }

    if (!product.shouldTakeInput) {
        // If the player has not chosen make X, we dont need to get input and can just start the crafting
        spinProduct(details, product.spinnable, product.count);
    } else {
        // We should prepare for a number to be sent from the client
        const numericInputSpinSub = details.player.numericInputEvent.subscribe((number) => {
            actionCancelledSpinSub?.unsubscribe();
            numericInputSpinSub?.unsubscribe();
            // When a number is recieved we can start crafting the product
            spinProduct(details, product.spinnable, number);
        });
        // If the player moves or cancels the number input, we do not want to wait for input, as they could be depositing
        // items into their bank.
        const actionCancelledSpinSub = details.player.actionsCancelled.subscribe(() => {
            actionCancelledSpinSub?.unsubscribe();
            numericInputSpinSub?.unsubscribe();
        });
        // Ask the player to enter how many they want to create
        details.player.outgoingPackets.showNumberInputDialogue();
    }


};

export default {
    pluginId: 'rs:spinning_wheel',
    hooks: [
        {
            type: 'object_interaction',
            objectIds: objectIds.spinningWheel,
            options: [ 'spin' ],
            walkTo: true,
            handler: openSpinningInterface
        },
        {
            type: 'button',
            widgetId: widgets.whatWouldYouLikeToSpin,
            buttonIds: Array.from(widgetButtonIds.keys()),
            handler: buttonClicked
        }
    ]
};
