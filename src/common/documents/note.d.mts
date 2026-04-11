import { DocumentOwnershipLevel, DocumentOwnershipString, ImageFilePath, TextAnchorPoint } from "#common/constants.mjs";
import { Document, DocumentMetadata, MetadataPermission } from "../abstract/_module.mjs";
import * as data from "../data/data.mjs";
import * as fields from "../data/fields.mjs";
import { BaseScene, BaseUser } from "./_module.mjs";

/**
 * The Document definition for a Note.
 * Defines the DataSchema and common behaviors for a Note which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Note
 * @param context Construction context options
 */
export default class BaseNote<TParent extends BaseScene | null> extends Document<TParent, NoteSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): NoteMetadata;

    static override defineSchema(): NoteSchema;

    /** The default icon used for newly created Note documents. */
    static DEFAULT_ICON: ImageFilePath;

    /* -------------------------------------------- */
    /*  Model Methods                               */
    /* -------------------------------------------- */

    testUserPermission(user: BaseUser, permission: DocumentOwnershipString | DocumentOwnershipLevel, { exact }?: { exact?: boolean }): boolean;
}

export default interface BaseNote<TParent extends BaseScene | null> extends Document<TParent, NoteSchema>, fields.ModelPropsFromSchema<NoteSchema> {
    get documentName(): NoteMetadata["name"];
}

interface NoteMetadata extends DocumentMetadata {
    name: "Note";
    collection: "notes";
    label: "DOCUMENT.Note";
    labelPlural: "DOCUMENT.Notes";
    permissions: {
        view: MetadataPermission;
        create: "NOTE_CREATE";
        update: MetadataPermission;
        delete: MetadataPermission;
    };
}

type NoteSchema = {
    _id: fields.DocumentIdField;
    author: fields.ForeignDocumentField<BaseUser>;
    entryId: fields.ForeignDocumentField<string>;
    pageId: fields.ForeignDocumentField<string>;
    x: fields.NumberField<number, number, true, false, true>;
    y: fields.NumberField<number, number, true, false, true>;
    elevation: fields.NumberField<number, number, true, false, true>;
    levels: fields.SceneLevelsSetField;
    sort: fields.NumberField<number, number, true, false, true>;
    locked: fields.BooleanField;
    texture: data.TextureData;
    iconSize: fields.NumberField<number, number, true, false, true>;
    text: fields.StringField<string, string, false, false, true>;
    fontFamily: fields.StringField<string, string, true, false, true>;
    fontSize: fields.NumberField<number, number, true, true, true>;
    textAnchor: fields.NumberField<TextAnchorPoint, TextAnchorPoint, true, false, true>;
    textColor: fields.ColorField;
    global: fields.BooleanField;
    flags: fields.DocumentFlagsField;
};

export type NoteSource = fields.SourceFromSchema<NoteSchema>;
