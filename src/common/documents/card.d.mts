import { DocumentOwnershipLevel, DocumentOwnershipString, ImageFilePath, VideoFilePath } from "#common/constants.mjs";
import Document, { DocumentMetadata } from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
import { BaseCards, BaseUser } from "./_module.mjs";

/**
 * The Document definition for a Card.
 * Defines the DataSchema and common behaviors for a Card which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Card
 * @param context Construction context options
 */
export default class BaseCard<TParent extends BaseCards | null> extends Document<TParent, CardSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): CardMetadata;

    static override defineSchema(): CardSchema;

    /** The default icon used for a Card face that does not have a custom image set */
    static DEFAULT_ICON: ImageFilePath | VideoFilePath;

    /** The allowed set of Card types which may exist */
    static get TYPES(): string[];

    /* -------------------------------------------- */
    /*  Model Methods                               */
    /* -------------------------------------------- */

    override testUserPermission(
        user: BaseUser,
        permission: DocumentOwnershipString | DocumentOwnershipLevel,
        { exact }?: { exact?: boolean | undefined },
    ): boolean;
}

export default interface BaseCard<TParent extends BaseCards | null> extends Document<TParent, CardSchema>, fields.ModelPropsFromSchema<CardSchema> {
    get documentName(): CardMetadata["name"];
}

interface CardMetadata extends DocumentMetadata {
    name: "Card";
    collection: "cards";
    indexed: true;
    label: "DOCUMENT.Card";
    labelPlural: "DOCUMENT.Cards";
}

type CardSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    description: fields.HTMLField;
    type: fields.StringField<string, string, true, false, false>;
    system: fields.TypeDataField;
    suit: fields.StringField<string, string, true>;
    value: fields.NumberField;
    back: fields.SchemaField<CardFaceSchema>;
    faces: fields.ArrayField<fields.SchemaField<CardFaceSchema>>;
    face: fields.NumberField<number, number, true>;
    drawn: fields.BooleanField;
    origin: fields.ForeignDocumentField<BaseCards>;
    width: fields.NumberField;
    height: fields.NumberField;
    rotation: fields.AngleField;
    sort: fields.IntegerSortField;
    flags: fields.DocumentFlagsField;
    _states: fields.DocumentStatsField;
};

type CardFaceSchema = {
    name: fields.StringField<string, string, false, false, true>;
    text: fields.HTMLField;
    img: fields.FilePathField<ImageFilePath | VideoFilePath>;
};

export type CardFaceData = fields.ModelPropsFromSchema<CardFaceSchema>;
