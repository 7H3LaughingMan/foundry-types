import Roll from "#client/dice/roll.mjs";
import { AudioFilePath, ChatMessageStyle, DocumentOwnershipLevel } from "#common/constants.mjs";
import { DocumentFlags } from "#common/data/_module.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import BaseUser from "./user.mjs";

/**
 * The ChatMessage document model.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the document.
 * @property data The constructed data object for the document.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class BaseChatMessage<TUser extends BaseUser | null = BaseUser | null> extends Document<null, ChatMessageSchema> {
    static override get metadata(): ChatMessageMetadata;

    static override defineSchema(): ChatMessageSchema;

    override getUserLevel(user: BaseUser): DocumentOwnershipLevel;
}

export default interface BaseChatMessage<TUser extends BaseUser | null>
    extends Document<null, ChatMessageSchema>, Omit<fields.ModelPropsFromSchema<ChatMessageSchema>, "author"> {
    get documentName(): ChatMessageMetadata["name"];

    author: TUser;
}

declare type ChatMessageSchema = {
    _id: fields.DocumentIdField;
    type: fields.DocumentTypeField<string, string, true, false, true, BaseChatMessage>;
    system: fields.TypeDataField;
    style: fields.NumberField<ChatMessageStyle, ChatMessageStyle, true, true, true>;
    author: fields.ForeignDocumentField<BaseUser, true, false, true>;
    timestamp: fields.NumberField<number, number, true, false, true>;
    flavor: fields.HTMLField;
    content: fields.HTMLField;
    speaker: fields.SchemaField<ChatSpeakerSchema>;
    whisper: fields.ArrayField<fields.ForeignDocumentField<string>>;
    blind: fields.BooleanField;
    rolls: fields.ArrayField<fields.JSONField<Roll, true>>;
    sound: fields.FilePathField<AudioFilePath>;
    emote: fields.BooleanField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type ChatMessageFlags = DocumentFlags & {
    core?: {
        canPopout?: boolean;
        initiativeRoll?: boolean;
        RollTable?: string;
    };
};

declare type ChatSpeakerSchema = {
    scene: fields.ForeignDocumentField<string>;
    actor: fields.ForeignDocumentField<string>;
    token: fields.ForeignDocumentField<string>;
    alias: fields.StringField<string, string, false, false, true>;
};

export type ChatSpeakerData = fields.SourceFromSchema<ChatSpeakerSchema>;

interface ChatMessageMetadata extends DocumentMetadata {
    name: "ChatMessage";
    collection: "messages";
    label: "DOCUMENT.ChatMessage";
    labelPlural: "DOCUMENT.ChatMessages";
    isPrimary: true;
}

export type ChatMessageSource = fields.SourceFromSchema<ChatMessageSchema>;

export {};
