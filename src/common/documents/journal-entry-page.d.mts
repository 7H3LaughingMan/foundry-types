import { DocumentOwnershipLevel, JournalEntryPageFormat } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseJournalEntry, BaseUser } from "./_module.mjs";

/** The JournalEntryPage document model. */
export default class BaseJournalEntryPage<TParent extends BaseJournalEntry | null> extends Document<TParent, JournalEntryPageSchema> {
    static override get metadata(): JournalEntryPageMetadata;

    static override defineSchema(): JournalEntryPageSchema;

    override getUserLevel(user: BaseUser): DocumentOwnershipLevel;
}

export default interface BaseJournalEntryPage<TParent extends BaseJournalEntry | null>
    extends Document<TParent, JournalEntryPageSchema>, fields.ModelPropsFromSchema<JournalEntryPageSchema> {
    get documentName(): JournalEntryPageMetadata["name"];
}

interface JournalEntryPageMetadata extends DocumentMetadata {
    name: "JournalEntryPage";
    collection: "pages";
    indexed: true;
    label: "DOCUMENT.JournalEntryPage";
    labelPlural: "DOCUMENT.JournalEntryPages";
    coreTypes: ["image", "pdf", "text", "video"];
}

type JournalEntryPageSchema<TType extends string = string, TSystemSource extends object = object, TSystemData extends object = TSystemSource> = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    type: fields.StringField<TType, TType, true, false, true>;
    system: fields.TypeDataField<TSystemSource, TSystemData>;
    title: fields.SchemaField<{
        show: fields.BooleanField;
        level: fields.NumberField<number, number, true, false, true>;
    }>;
    image: fields.SchemaField<{
        caption: fields.StringField<string, string, false, false, false>;
    }>;
    text: fields.SchemaField<{
        content: fields.HTMLField<string, string, false, false, false>;
        markdown: fields.StringField<string, string, false, false, false>;
        format: fields.NumberField<JournalEntryPageFormat>;
    }>;
    video: fields.SchemaField<{
        controls: fields.BooleanField;
        loop: fields.BooleanField<boolean, boolean, false, false, false>;
        autoplay: fields.BooleanField<boolean, boolean, false, false, false>;
        volume: fields.AlphaField<true, false, true>;
        timestamp: fields.NumberField<number, number, false, false, false>;
        width: fields.NumberField<number, number, true, false, false>;
        height: fields.NumberField<number, number, false, false, false>;
    }>;
    src: fields.StringField<string, string, false, true, true>;
    category: fields.DocumentIdField;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type JournalEntryPageSource = fields.SourceFromSchema<JournalEntryPageSchema>;

export type CorePageType = "image" | "pdf" | "text" | "video";
