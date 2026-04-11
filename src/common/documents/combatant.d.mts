import { ImageFilePath } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import BaseCombat from "./combat.mjs";

/** The Combat document model. */
export default class BaseCombatant<TParent extends BaseCombat | null> extends Document<TParent, CombatantSchema> {
    static override get metadata(): CombatantMetadata;

    static override defineSchema(): CombatantSchema;
}

export default interface BaseCombatant<TParent extends BaseCombat | null>
    extends Document<TParent, CombatantSchema>, fields.ModelPropsFromSchema<CombatantSchema> {
    get documentName(): CombatantMetadata["name"];
}

interface CombatantMetadata extends DocumentMetadata {
    name: "Combatant";
    collection: "combatants";
    label: "DOCUMENT.Combatant";
}

/** The data schema for a Combat document. */
type CombatantSchema = {
    _id: fields.DocumentIdField;
    type: fields.DocumentTypeField<string, string, true, false, true, BaseCombatant>;
    system: fields.TypeDataField;
    actorId: fields.ForeignDocumentField<string>;
    tokenId: fields.ForeignDocumentField<string>;
    sceneId: fields.ForeignDocumentField<string>;
    name: fields.StringField<string, string, false, false, true>;
    img: fields.FilePathField<ImageFilePath>;
    initiative: fields.NumberField;
    hidden: fields.BooleanField;
    defeated: fields.BooleanField;
    group: fields.DocumentIdField;
    roundJoints: fields.NumberField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type CombatantSource = fields.SourceFromSchema<CombatantSchema>;
