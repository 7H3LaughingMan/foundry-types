import { DocumentOwnershipLevel, DocumentOwnershipString, DrawingFillType, ImageFilePath } from "#common/constants.mjs";
import * as abstract from "../abstract/_module.mjs";
import * as data from "../data/data.mjs";
import * as fields from "../data/fields.mjs";
import { BaseScene, BaseUser } from "./_module.mjs";

/**
 * The Document definition for a Drawing.
 * Defines the DataSchema and common behaviors for a Drawing which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Drawing
 * @param context Construction context options
 */
export default class BaseDrawing<TParent extends BaseScene | null> extends abstract.Document<TParent, DrawingSchema> {
    /* ---------------------------------------- */
    /*  Model Configuration                     */
    /* ---------------------------------------- */

    static override get metadata(): DrawingMetadata;

    static override defineSchema(): DrawingSchema;

    static override validateJoint(data: DrawingSource): void;

    /* ---------------------------------------- */
    /*  Model Methods                           */
    /* ---------------------------------------- */

    override testUserPermission(user: BaseUser, permission: DocumentOwnershipString | DocumentOwnershipLevel, { exact }?: { exact?: boolean }): boolean;
}

export default interface BaseDrawing<TParent extends BaseScene | null>
    extends abstract.Document<TParent, DrawingSchema>, fields.ModelPropsFromSchema<DrawingSchema> {
    get documentName(): DrawingMetadata["name"];
}

interface DrawingMetadata extends abstract.DocumentMetadata {
    name: "Drawing";
    collection: "drawings";
    label: "DOCUMENT.Drawing";
    labelPlural: "DOCUMENT.Drawings";
    isEmbedded: true;
    permissions: {
        view: abstract.MetadataPermission;
        create: "DRAWING_CREATE";
        update: abstract.MetadataPermission;
        delete: abstract.MetadataPermission;
    };
}

type DrawingSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    author: fields.ForeignDocumentField<BaseUser, true, false, true>;
    shape: fields.EmbeddedDataField<data.ShapeData<BaseDrawing<BaseScene | null>>>;
    x: fields.NumberField<number, number, true, false, true>;
    y: fields.NumberField<number, number, true, false, true>;
    elevation: fields.NumberField<number, number, true, false, true>;
    levels: fields.SceneLevelsSetField;
    sort: fields.NumberField<number, number, true, false, true>;
    rotation: fields.AngleField;
    bezierFactor: fields.AlphaField;
    fillType: fields.NumberField<DrawingFillType, DrawingFillType, true, true, true>;
    fillColor: fields.ColorField;
    fillAlpha: fields.AlphaField;
    strokeWidth: fields.NumberField;
    strokeColor: fields.ColorField;
    strokeAlpha: fields.AlphaField;
    texture: fields.FilePathField<ImageFilePath>;
    text: fields.StringField;
    fontFamily: fields.StringField;
    fontSize: fields.NumberField;
    textColor: fields.ColorField;
    textAlpha: fields.AlphaField;
    hidden: fields.BooleanField;
    locked: fields.BooleanField;
    interface: fields.BooleanField;
    flags: fields.DocumentFlagsField;
};

export type DrawingSource = fields.SourceFromSchema<DrawingSchema>;
