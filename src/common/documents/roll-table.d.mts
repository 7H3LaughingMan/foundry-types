import { ImageFilePath } from "#common/constants.mjs";
import { Document, DocumentMetadata, EmbeddedCollection } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseFolder, BaseTableResult } from "./_module.mjs";

/**
 * The Document definition for a RollTable.
 * Defines the DataSchema and common behaviors for a RollTable which are shared between both client and server.
 */
export default class BaseRollTable extends Document<null, RollTableSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): RollTableMetadata;

    static override defineSchema(): RollTableSchema;

    /** The default icon used for newly created Macro documents */
    static DEFAULT_ICON: ImageFilePath;
}

export default interface BaseRollTable extends Document<null, RollTableSchema>, fields.ModelPropsFromSchema<RollTableSchema> {
    /** A reference to the Collection of TableResult instances in this document, indexed by _id. */
    readonly results: EmbeddedCollection<BaseTableResult<this>>;

    get documentName(): (typeof BaseRollTable)["metadata"]["name"];
}

interface RollTableMetadata extends DocumentMetadata {
    name: "RollTable";
    collection: "tables";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "description", "img", "sort", "folder"];
    embedded: { TableResult: "results" };
    label: "DOCUMENT.RollTable";
    labelPlural: "DOCUMENT.RollTables";
}

type RollTableSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    img: fields.FilePathField<ImageFilePath>;
    description: fields.HTMLField;
    results: fields.EmbeddedCollectionField<BaseTableResult<BaseRollTable>>;
    formula: fields.StringField<string>;
    replacement: fields.BooleanField;
    displayRoll: fields.BooleanField;
    folder: fields.ForeignDocumentField<BaseFolder>;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type RollTableSource = fields.SourceFromSchema<RollTableSchema>;
