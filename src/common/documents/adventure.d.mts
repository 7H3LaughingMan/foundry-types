import { DocumentOwnershipLevel, ImageFilePath, UserAction, UserPermission, UserRole, UserRoleName } from "#common/constants.mjs";
import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import * as documents from "./_module.mjs";

/**
 * The Document definition for an Adventure.
 * Defines the DataSchema and common behaviors for an Adventure which are shared between both client and server.
 * @memberof documents
 *
 * @param data    Initial data from which to construct the Actor
 * @param context Construction context options
 */
export default class BaseAdventure extends Document<null, AdventureSchema> {
    static override get metadata(): AdventureMetadata;

    static override defineSchema(): AdventureSchema;

    /* ---------------------------------------- */
    /*  Permissions                             */
    /* ---------------------------------------- */

    /** Test whether the User has a GAMEMASTER or ASSISTANT role in this World? */
    get isGM(): boolean;

    /**
     * Test whether the User is able to perform a certain permission action.
     * The provided permission string may pertain to an explicit permission setting or a named user role.
     * Alternatively, Gamemaster users are assumed to be allowed to take all actions.
     *
     * @param action The action to test
     * @return Does the user have the ability to perform this action?
     */
    can(action: UserAction): boolean;

    getUserLevel(user: documents.BaseUser): DocumentOwnershipLevel;

    /**
     * Test whether the User has at least a specific permission
     * @param permission The permission name from USER_PERMISSIONS to test
     * @return Does the user have at least this permission
     */
    hasPermission(permission: UserPermission): boolean;

    /**
     * Test whether the User has at least the permission level of a certain role
     * @param role The role name from USER_ROLES to test
     * @param [exact] Require the role match to be exact
     * @return Does the user have at this role level (or greater)?
     */
    hasRole(role: UserRole | UserRoleName, { exact }?: { exact: boolean }): boolean;
}

export default interface BaseAdventure extends Document<null, AdventureSchema>, fields.ModelPropsFromSchema<AdventureSchema> {
    get documentName(): AdventureMetadata["name"];
}

interface AdventureMetadata extends DocumentMetadata {
    name: "Adventure";
    collection: "Adventures";
    label: "DOCUMENT.Adventure";
    isPrimary: true;
}

type AdventureSchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    img: fields.FilePathField<ImageFilePath>;
    caption: fields.HTMLField;
    description: fields.HTMLField;
    actors: fields.SetField<fields.EmbeddedDataField<documents.BaseActor<null>>>;
    combats: fields.SetField<fields.EmbeddedDataField<documents.BaseCombat>>;
    items: fields.SetField<fields.EmbeddedDataField<documents.BaseItem<null>>>;
    journal: fields.SetField<fields.EmbeddedDataField<documents.BaseJournalEntry>>;
    scenes: fields.SetField<fields.EmbeddedDataField<documents.BaseScene>>;
    tables: fields.SetField<fields.EmbeddedDataField<documents.BaseRollTable>>;
    macros: fields.SetField<fields.EmbeddedDataField<documents.BaseMacro>>;
    cards: fields.SetField<fields.EmbeddedDataField<documents.BaseCards>>;
    playlists: fields.SetField<fields.EmbeddedDataField<documents.BasePlaylist>>;
    folders: fields.SetField<fields.EmbeddedDataField<documents.BaseFolder>>;
    folder: fields.ForeignDocumentField<documents.BaseFolder>;
    sort: fields.IntegerSortField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type AdventureSource = fields.SourceFromSchema<AdventureSchema>;
