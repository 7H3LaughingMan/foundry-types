import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as data from "../data/data.mjs";
import * as fields from "../data/fields.mjs";
import BaseScene from "./scene.mjs";

/** The AmbientLight embedded document model. */
export default class BaseAmbientLight<TParent extends BaseScene | null> extends Document<TParent, AmbientLightSchema> {
    static override get metadata(): AmbientLightMetadata;

    static override defineSchema(): AmbientLightSchema;

    protected override _initialize(): void;
}

export default interface BaseAmbientLight<TParent extends BaseScene | null>
    extends Document<TParent, AmbientLightSchema>, fields.ModelPropsFromSchema<AmbientLightSchema> {}

interface AmbientLightMetadata extends DocumentMetadata {
    name: "AmbientLight";
    collection: "lights";
    label: "DOCUMENT.AmbientLight";
    isEmbedded: true;
}

export type AmbientLightSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, false, false, false>;
    x: fields.NumberField<number, number, true, false, true>;
    y: fields.NumberField<number, number, true, false, true>;
    elevation: fields.NumberField<number, number, true, false, true>;
    levels: fields.SceneLevelsSetField;
    rotation: fields.AngleField;
    walls: fields.BooleanField;
    vision: fields.BooleanField;
    config: fields.EmbeddedDataField<data.LightData<BaseAmbientLight<BaseScene | null>>>;
    hidden: fields.BooleanField;
    locked: fields.BooleanField;
    flags: fields.DocumentFlagsField;
};

export type AmbientLightSource = fields.SourceFromSchema<AmbientLightSchema>;

export {};
