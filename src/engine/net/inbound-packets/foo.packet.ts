import { logger } from '@runejs/common';
import { widgets } from '@engine/config';
import { Player } from '@engine/world/actor';
import { PacketData } from '@engine/net';
import { Position } from '@engine/world';

/**
 * Parses the item on world item packet and calls the `item_on_world_item` action pipeline.
 *
 * This will check that the item being used is in the player's inventory, and that the world item exists in the correct location.
 * The action pipeline will not be called if either of these conditions are not met.
 *
 * @param player The player that sent the packet.
 * @param packet The packet to parse.
 *
 * @author jameskmonger
 */
const fooPacket = (player: Player, packet: PacketData) => {
    const { buffer } = packet;

    const a = buffer.get('short', 'u', 'be');
    const b = buffer.get('short', 'u', 'be');
    const c = buffer.get('short', 'u', 'le');

    player.sendMessage(`a: ${a}, b: ${b}, c: ${c}`);
};

export default {
    opcode: 65,
    size: 6,
    handler: fooPacket
};
