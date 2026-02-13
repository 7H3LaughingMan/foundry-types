import Region from "../canvas/placeables/region.mjs";
import EmbeddedCollection from "./../../common/abstract/embedded-collection.mjs";
import { RegionPolygonTree } from "./../data/region-shapes/polygon-tree.mjs";
import { RegionShape } from "./../data/region-shapes/shape.mjs";
import { BaseRegion, RegionBehavior, Scene } from "./_module.mjs";
import { CanvasDocument, CanvasDocumentStatic } from "./abstract/canvas-document.mjs";

interface CanvasBaseRegionStatic extends Omit<typeof BaseRegion, "new">, CanvasDocumentStatic {}

declare const CanvasBaseRegion: {
    new <TParent extends Scene | null>(...args: any): BaseRegion<TParent> & CanvasDocument<TParent>;
} & CanvasBaseRegionStatic;

interface CanvasBaseRegion<TParent extends Scene | null> extends InstanceType<typeof CanvasBaseRegion<TParent>> {}

export default class RegionDocument<TParent extends Scene | null = Scene | null> extends CanvasBaseRegion<TParent> {
    /* -------------------------------------------- */
    /*  Properties                                  */
    /* -------------------------------------------- */

    /**
     * The shapes of this Region.
     * The value of this property must not be mutated.
     * This property is updated only by a document update.
     */
    get regionShapes(): readonly RegionShape[];

    /**
     * The polygons of this Region.
     * The value of this property must not be mutated.
     * This property is updated only by a document update.
     */
    get polygons(): readonly PIXI.Polygon[];

    /**
     * The polygon tree of this Region.
     *
     * The value of this property must not be mutated.
     *
     * This property is updated only by a document update.
     */
    get polygonTree(): RegionPolygonTree;

    /**
     * Activate the Socket event listeners.
     * @param    socket    The active game socket
     * @internal
     */
    static _activateSocketListeners(socket: unknown): void;

    /** The tokens inside this region. */
    tokens: Set<CollectionValue<NonNullable<TParent>["tokens"]>>;

    /**
     * Trigger the Region event.
     * @param    eventName        The event name
     * @param    eventData        The event data
     * @internal
     */
    _triggerEvent(eventName: string, eventData: object): Promise<void>;

    /**
     * Handle the Region event.
     * @param {RegionEvent} event    The Region event
     * @internal
     */
    _handleEvent(event: unknown): Promise<void>;

    /**
     * Update the tokens of this region.
     * @param    [options={}]               Additional options
     * @param    [options.deleted=false]    Was the Region deleted?
     * @returns                             True if the regions could be updated. False otherwise.
     * @internal
     */
    _updateTokens(options?: { deleted?: boolean }): Promise<boolean>;
}

export default interface RegionDocument<TParent extends Scene | null = Scene | null> extends CanvasBaseRegion<TParent> {
    get object(): Region<this>;

    readonly behaviors: EmbeddedCollection<RegionBehavior<this>>;
}

export interface SocketRegionEvent<TData extends object = object> {
    /** The UUID of the Region the event was triggered on */
    regionUuid: string;
    /** The ID of the User that triggered the event */
    userId: string;
    /** The name of the event */
    eventName: string;
    /** The data of the event */
    eventData: TData;
    /** The keys of the event data that are Documents */
    eventDataUuids: string[];
}

export {};
