import { AudioFilePath } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import BaseScene from "./scene.mjs";

/**
 * The Document definition for an AmbientSound.
 * Defines the DataSchema and common behaviors for an AmbientSound which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the AmbientSound
 * @param context Construction context options
 */
export default class BaseAmbientSound<TParent extends BaseScene | null> extends Document<TParent, AmbientSoundSchema> {
    static override get metadata(): AmbientSoundMetadata;

    static defineSchema(): AmbientSoundSchema;
}

export default interface BaseAmbientSound<TParent extends BaseScene | null>
    extends Document<TParent, AmbientSoundSchema>, fields.ModelPropsFromSchema<AmbientSoundSchema> {
    get documentName(): AmbientSoundMetadata["name"];
}

interface AmbientSoundMetadata extends DocumentMetadata {
    name: "AmbientSound";
    collection: "sounds";
    label: "DOCUMENT.AmbientSound";
    labelPlural: "DOCUMENT.AmbientSounds";
    isEmbedded: true;
}

type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * @typedef {Object} AmbientSoundData

 * @property {{min: number, max: number}} darkness  A darkness range (min and max) for which the source should be active
 * @property {object} [flags]             An object of optional key/value flags
 */
type AmbientSoundSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, false, false, false>;
    x: fields.NumberField<number, number, true, false, true>;
    y: fields.NumberField<number, number, true, false, true>;
    elevation: fields.NumberField<number, number, true, false, true>;
    levels: fields.SceneLevelsSetField;
    radius: fields.NumberField<number, number, true, false, true>;
    path: fields.FilePathField<AudioFilePath>;
    repeat: fields.BooleanField;
    volume: fields.AlphaField;
    walls: fields.BooleanField;
    easing: fields.BooleanField;
    hidden: fields.BooleanField;
    locked: fields.BooleanField;
    darkness: fields.SchemaField<{
        min: fields.AlphaField;
        max: fields.AlphaField;
    }>;
    effects: fields.SchemaField<{
        base: fields.SchemaField<{
            type: fields.StringField<string, string, false, false, false>;
            intensity: fields.NumberField<OneToTen, OneToTen, true, false, true>;
        }>;
        muffled: fields.SchemaField<{
            type: fields.StringField<string, string, false, false, false>;
            intensity: fields.NumberField<OneToTen, OneToTen, true, false, true>;
        }>;
    }>;
    flags: fields.DocumentFlagsField;
};

export type AmbientSoundSource = fields.SourceFromSchema<AmbientSoundSchema>;
