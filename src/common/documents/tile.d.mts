import { TileOcclusionMode } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import { TextureData } from "../data/data.mjs";
import * as fields from "../data/fields.mjs";
import { BaseScene } from "./_module.mjs";

/**
 * The Document definition for a Tile.
 * Defines the DataSchema and common behaviors for a Tile which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Tile
 * @param context Construction context options
 */
export default class BaseTile<TParent extends BaseScene | null> extends Document<TParent, TileSchema> {
    /* -------------------------------------------- */
    /*  Model Configuration                         */
    /* -------------------------------------------- */

    static override get metadata(): TileMetadata;

    static override defineSchema(): TileSchema;
}

export default interface BaseTile<TParent extends BaseScene | null> extends Document<TParent, TileSchema>, fields.ModelPropsFromSchema<TileSchema> {
    get documentName(): TileMetadata["name"];
}

interface TileMetadata extends DocumentMetadata {
    name: "Tile";
    collection: "tiles";
    label: "DOCUMENT.Tile";
    labelPlural: "DOCUMENT.Tiles";
}

type TileSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    texture: TextureData;
    width: fields.NumberField<number, number, true, false, true>;
    height: fields.NumberField<number, number, true, false, true>;
    x: fields.NumberField<number, number, true, false, true>;
    y: fields.NumberField<number, number, true, false, true>;
    elevation: fields.SchemaField<RegionElevationSchema>;
    levels: fields.SceneLevelsSetField;
    sort: fields.NumberField<number, number, true, false, true>;
    rotation: fields.AngleField;
    alpha: fields.AlphaField;
    hidden: fields.BooleanField;
    locked: fields.BooleanField;
    restrictions: fields.SchemaField<{
        light: fields.BooleanField;
        weather: fields.BooleanField;
    }>;
    occlusion: fields.SchemaField<{
        mode: fields.NumberField<TileOcclusionMode, TileOcclusionMode, false, true, true>;
        alpha: fields.AlphaField;
    }>;
    video: fields.SchemaField<{
        loop: fields.BooleanField;
        autoplay: fields.BooleanField;
        volumn: fields.AlphaField;
    }>;
    flags: fields.DocumentFlagsField;
};

export type TileSource = fields.SourceFromSchema<TileSchema>;
