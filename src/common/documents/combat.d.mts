import { DatabaseUpdateCallbackOptions, Document, DocumentMetadata, EmbeddedCollection } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseCombatant, BaseCombatantGroup, BaseScene, BaseUser } from "./_module.mjs";

/** The Combat document model. */
export default class BaseCombat extends Document<null, CombatSchema> {
    static override get metadata(): CombatMetadata;

    static override defineSchema(): CombatSchema;

    /* -------------------------------------------- */
    /*  Event Handlers                              */
    /* -------------------------------------------- */

    protected override _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: BaseUser): Promise<boolean | void>;
}

export default interface BaseCombat extends Document<null, CombatSchema>, fields.ModelPropsFromSchema<CombatSchema> {
    readonly combatants: EmbeddedCollection<BaseCombatant<this>>;

    get documentName(): CombatMetadata["name"];
}

interface CombatMetadata extends DocumentMetadata {
    name: "Combat";
    collection: "combats";
    label: "DOCUMENT.Combat";
    embedded: {
        Combatant: "combatants";
        CombatantGroup: "groups";
    };
    isPrimary: true;
}

type CombatSchema = {
    _id: fields.DocumentIdField;
    type: fields.DocumentTypeField<string, string, true, false, true, BaseCombat>;
    system: fields.TypeDataField;
    scene: fields.ForeignDocumentField<BaseScene>;
    groups: fields.EmbeddedCollectionField<BaseCombatantGroup<BaseCombat>>;
    combatants: fields.EmbeddedCollectionField<BaseCombatant<BaseCombat>>;
    active: fields.BooleanField;
    round: fields.NumberField<number, number, true, false, true>;
    turn: fields.NumberField<number, number, true, true, true>;
    sort: fields.IntegerSortField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type CombatSource = fields.SourceFromSchema<CombatSchema>;
