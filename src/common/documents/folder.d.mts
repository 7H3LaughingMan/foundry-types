import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import { FOLDER_DOCUMENT_TYPES, FolderDocumentType } from "../constants.mjs";
import * as fields from "../data/fields.mjs";

/**
 * The Folder Document model.
 *
 * @param data Initial data from which to construct the document.
 * @property data The constructed data object for the document.
 */
export default class BaseFolder extends Document<null, FolderSchema> {
    /* ---------------------------------------- */
    /*  Model Configuration                     */
    /* ---------------------------------------- */
    static override get metadata(): FolderMetadata;

    static override defineSchema(): FolderSchema;

    static override LOCALIZATION_PREFIXES: string[];

    static override validateJoint(data: FolderSource): void;

    /** Allow folder sorting modes */
    static SORTING_MODES: ["a", "m"];

    static override get(documentId: string, options?: object): BaseFolder | null | undefined;
}

export default interface BaseFolder extends Document<null, FolderSchema>, fields.ModelPropsFromSchema<FolderSchema> {
    get documentName(): FolderMetadata["name"];
}

interface FolderMetadata extends DocumentMetadata {
    name: "Folder";
    collection: "folders";
    label: "DOCUMENT.Folder";
    labelPlural: "DOCUMENT.Folders";
    coreTypes: typeof FOLDER_DOCUMENT_TYPES;
}

type FolderSortingMode = (typeof BaseFolder.SORTING_MODES)[number];

type FolderSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    type: fields.StringField<FolderDocumentType, FolderDocumentType, true, false, false>;
    description: fields.StringField<string, string, false, false, true>;
    folder: fields.ForeignDocumentField<BaseFolder>;
    sorting: fields.StringField<FolderSortingMode, FolderSortingMode, true, false, true>;
    sort: fields.IntegerSortField;
    color: fields.ColorField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type FolderSource = fields.SourceFromSchema<FolderSchema>;
