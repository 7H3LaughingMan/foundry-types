import { ImageFilePath } from "#common/constants.mjs";
import { DatabaseUpdateCallbackOptions, Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseScene, BaseUser } from "./_module.mjs";

/**
 * The Document definition for FogExploration.
 * Defines the DataSchema and common behaviors for FogExploration which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the FogExploration
 * @param context Construction context options
 */
export default class BaseFogExploration extends Document<null, FogExplorationSchema> {
    static override get metadata(): FogExplorationMetadata;

    static override defineSchema(): FogExplorationSchema;

    protected override _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: BaseUser): Promise<boolean | void>;
}

export default interface BaseFogExploration extends Document<null, FogExplorationSchema>, fields.ModelPropsFromSchema<FogExplorationSchema> {
    get documentName(): FogExplorationMetadata["name"];
}

interface FogExplorationMetadata extends DocumentMetadata {
    name: "FogExploration";
    collection: "fog";
    label: "DOCUMENT.FogExploration";
    labelPlural: "DOCUMENT.FogExplorations";
    isPrimary: true;
}

type FogExplorationSchema = {
    _id: fields.DocumentIdField;
    user: fields.ForeignDocumentField<BaseUser>;
    scene: fields.ForeignDocumentField<BaseScene>;
    level: fields.DocumentIdField<string, true, true, true>;
    explored: fields.FilePathField<ImageFilePath, ImageFilePath, true>;
    positions: fields.ObjectField<object>;
    timestamp: fields.NumberField<number, number, false, true, true>;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type FogExplorationSource = fields.SourceFromSchema<FogExplorationSchema>;
