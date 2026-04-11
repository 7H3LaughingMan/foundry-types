import { ImageFilePath, MacroScope, MacroType } from "#common/constants.mjs";
import { Document, DocumentMetadata, MetadataPermission } from "../abstract/_module.mjs";
import { DatabaseCreateCallbackOptions } from "../abstract/_types.mjs";
import * as fields from "../data/fields.mjs";
import BaseUser from "./user.mjs";

/**
 * The Document definition for a Macro.
 * Defines the DataSchema and common behaviors for a Macro which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Macro
 * @param context Construction context options
 */
export default class BaseMacro extends Document<null, MacroSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): MacroMetadata;

    static override defineSchema(): MacroSchema;

    /** The default icon used for newly created Macro documents. */
    static DEFAULT_ICON: ImageFilePath;

    /* -------------------------------------------- */
    /*  Model Methods                               */
    /* -------------------------------------------- */

    override testUserPermission(user: BaseUser, permission: unknown, options?: { exact?: boolean }): boolean;

    /* -------------------------------------------- */
    /*  Database Event Handlers                     */
    /* -------------------------------------------- */

    protected override _preCreate(data: DeepPartial<this["_source"]>, options: DatabaseCreateCallbackOptions, user: BaseUser): Promise<boolean | void>;
}

export default interface BaseMacro extends Document<null, MacroSchema>, fields.ModelPropsFromSchema<MacroSchema> {
    get documentName(): MacroMetadata["name"];
}

interface MacroMetadata extends DocumentMetadata {
    name: "Macro";
    collection: "macros";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "img", "sort", "folder"];
    label: "DOCUMENT.Macro";
    labelPlural: "DOCUMENT.Macros";
    coreTypes: MacroType[];
    permissions: {
        view: MetadataPermission;
        create: "PLAYER";
        update: MetadataPermission;
        delete: MetadataPermission;
    };
}

type MacroSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    type: fields.StringField<MacroType, MacroType, true, false, true>;
    author: fields.ForeignDocumentField<BaseUser>;
    img: fields.FilePathField<ImageFilePath>;
    scope: fields.StringField<MacroScope, MacroScope, true, false, true>;
    command: fields.StringField<string, string, true, false, true>;
    folder: fields.ForeignDocumentField;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type MacroSource = fields.SourceFromSchema<MacroSchema>;
