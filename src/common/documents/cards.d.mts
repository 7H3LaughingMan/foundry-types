import { DocumentOwnershipLevel, DocumentOwnershipString, ImageFilePath, VideoFilePath } from "#common/constants.mjs";
import * as abstract from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseCard, BaseFolder, BaseUser } from "./_module.mjs";

/**
 * The Document definition for Cards.
 * Defines the DataSchema and common behaviors for Cards which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Cards
 * @param context Construction context options
 */
export default class BaseCards extends abstract.Document<null, CardsSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): CardsMetadata;

    static override defineSchema(): CardsSchema;

    /** The default icon used for a cards stack that does not have a custom image set */
    static DEFAULT_ICON: ImageFilePath | VideoFilePath;

    static get TYPES(): string[];

    override testUserPermission(user: BaseUser, permission: DocumentOwnershipString | DocumentOwnershipLevel, { exact }?: { exact?: boolean }): boolean;
}

export default interface BaseCards extends abstract.Document<null, CardsSchema>, fields.ModelPropsFromSchema<CardsSchema> {
    get documentName(): CardsMetadata["name"];
}

interface CardsMetadata extends abstract.DocumentMetadata {
    name: "Cards";
    collection: "cards";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "description", "img", "type", "sort", "folder"];
    embedded: { Card: "cards" };
    label: "DOCUMENT.Cards";
    labelPlural: "DOCUMENT.CardsPlural";
    permissions: {
        view: abstract.MetadataPermission;
        create: "CARDS_CREATE";
        update: abstract.MetadataPermission;
        delete: abstract.MetadataPermission;
    };
    coreTypes: ["deck", "hand", "pile"];
}

type CardsSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    type: fields.StringField<CardsType, CardsType, true, false, true>;
    description: fields.HTMLField;
    img: fields.FilePathField<ImageFilePath | VideoFilePath>;
    system: fields.TypeDataField;
    cards: fields.EmbeddedCollectionField<BaseCard<BaseCards>>;
    width: fields.NumberField;
    height: fields.NumberField;
    rotation: fields.AngleField;
    displayCount: fields.BooleanField;
    folder: fields.ForeignDocumentField<BaseFolder>;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

type CardsType = CardsMetadata["coreTypes"][number];

export type CardsSource = fields.SourceFromSchema<CardsSchema>;
