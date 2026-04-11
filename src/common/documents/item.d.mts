import { DocumentOwnershipLevel, DocumentOwnershipString, ImageFilePath, UserAction } from "#common/constants.mjs";
import * as abstract from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseActiveEffect, BaseActor, BaseFolder, BaseUser, ItemUUID } from "./_module.mjs";

/**
 * The Document definition for an Item.
 * Defines the DataSchema and common behaviors for an Item which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Item
 * @param context Construction context options
 */
export default class BaseItem<TParent extends BaseActor | null = BaseActor | null> extends abstract.Document<TParent, ItemSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): ItemMetadata;

    static override defineSchema(): ItemSchema;

    /** The default icon used for newly created Item documents */
    static DEFAULT_ICON: ImageFilePath;

    /**
     * Determine default artwork based on the provided item data.
     * @param The source item data.
     * @returns Candidate item image.
     */
    static getDefaultArtwork(itemData: ItemSource): { img: ImageFilePath };

    /** The allowed set of Item types which may exist. */
    static get TYPES(): string[];

    override canUserModify(user: BaseUser, action: UserAction, data?: Record<string, unknown>): boolean;

    override testUserPermission(user: BaseUser, permission: DocumentOwnershipString | DocumentOwnershipLevel, { exact }?: { exact?: boolean }): boolean;
}

export default interface BaseItem<TParent extends BaseActor | null = BaseActor | null>
    extends abstract.Document<TParent, ItemSchema>, fields.ModelPropsFromSchema<ItemSchema> {
    get documentName(): ItemMetadata["name"];

    readonly effects: abstract.EmbeddedCollection<BaseActiveEffect<this>>;
}

interface ItemMetadata extends abstract.DocumentMetadata {
    name: "Item";
    collection: "items";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "img", "type", "sort", "folder"];
    embedded: { ActiveEffect: "effects" };
    label: "DOCUMENT.Item";
    labelPlural: "DOCUMENT.Items";
    permissions: Omit<abstract.DocumentMetadata["permissions"], "create"> & {
        create: "ITEM_CREATE";
    };
}

export type ItemSchema<TType extends string = string, TSystemSource extends object = object> = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    type: fields.StringField<TType, TType, true, false, false>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, false, true, true>;
    system: fields.TypeDataField<TSystemSource>;
    effects: fields.EmbeddedCollectionField<BaseActiveEffect<BaseItem<BaseActor | null>>>;
    folder: fields.ForeignDocumentField<BaseFolder>;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField<ItemUUID>;
};

export type ItemSource<TType extends string = string, TSystemSource extends object = object> = fields.SourceFromSchema<ItemSchema<TType, TSystemSource>>;
