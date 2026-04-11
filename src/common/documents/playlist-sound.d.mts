import { AudioFilePath, DocumentOwnershipLevel, DocumentOwnershipString } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BasePlaylist, BaseUser } from "./_module.mjs";

/** The PlaylistSound document model. */
export default class BasePlaylistSound<TParent extends BasePlaylist | null = BasePlaylist | null> extends Document<TParent, PlaylistSoundSchema> {
    static override get metadata(): PlaylistSoundMetadata;

    static override defineSchema(): PlaylistSoundSchema;

    testUserPermission(user: BaseUser, permission: DocumentOwnershipString | DocumentOwnershipLevel, { exact }?: { exact?: boolean }): boolean;
}

export default interface BasePlaylistSound<TParent extends BasePlaylist | null = BasePlaylist | null>
    extends Document<TParent, PlaylistSoundSchema>, fields.ModelPropsFromSchema<PlaylistSoundSchema> {
    getDocumentName: PlaylistSoundMetadata["name"];
}

interface PlaylistSoundMetadata extends DocumentMetadata {
    name: "PlaylistSound";
    collection: "sounds";
    indexed: true;
    label: "DOCUMENT.PlaylistSound";
    labelPlural: "DOCUMENT.PlaylistSounds";
}

type PlaylistSoundSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    description: fields.StringField;
    path: fields.FilePathField<AudioFilePath>;
    channel: fields.StringField<string, string, true, false, true>;
    playing: fields.BooleanField;
    pausedTime: fields.NumberField;
    repeat: fields.BooleanField;
    volume: fields.AlphaField;
    fade: fields.NumberField;
    sort: fields.IntegerSortField;
    flags: fields.DocumentFlagsField;
};

export type PlaylistSoundSource = fields.SourceFromSchema<PlaylistSoundSchema>;
