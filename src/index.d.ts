import Config from "#client/config.mjs";
import { FoundryUI } from "#client/ui.mjs";
import "./global-external.mjs";

declare global {
    namespace globalThis {
        const CONFIG: Config<
            foundry.documents.AmbientLightDocument<foundry.documents.Scene | null>,
            foundry.documents.ActiveEffect<foundry.documents.Actor | foundry.documents.Item | null>,
            foundry.documents.Actor<foundry.documents.TokenDocument | null>,
            foundry.documents.ActorDelta<foundry.documents.TokenDocument>,
            foundry.applications.sidebar.tabs.ChatLog,
            foundry.documents.ChatMessage,
            foundry.documents.Combat,
            foundry.documents.Combatant<foundry.documents.Combat | null, foundry.documents.TokenDocument | null>,
            foundry.applications.sidebar.tabs.CombatTracker<foundry.documents.Combat | null>,
            foundry.applications.sidebar.tabs.CompendiumDirectory,
            foundry.applications.ui.Hotbar<foundry.documents.Macro>,
            foundry.documents.Item<foundry.documents.Actor | null>,
            foundry.documents.Macro,
            foundry.documents.RegionDocument<foundry.documents.Scene | null>,
            foundry.documents.RegionBehavior<foundry.documents.RegionDocument | null>,
            foundry.documents.TileDocument<foundry.documents.Scene | null>,
            foundry.documents.TokenDocument<foundry.documents.Scene | null>,
            foundry.documents.WallDocument<foundry.documents.Scene | null>,
            foundry.documents.Scene,
            foundry.documents.User,
            foundry.canvas.groups.EffectsCanvasGroup
        >;
        const canvas: foundry.canvas.Canvas;
        const game: foundry.Game<
            foundry.documents.Actor<null>,
            foundry.documents.collections.Actors<foundry.documents.Actor<null>>,
            foundry.documents.ChatMessage,
            foundry.documents.Combat,
            foundry.documents.Item<null>,
            foundry.documents.Macro,
            foundry.documents.Scene,
            foundry.documents.User
        >;
        const ui: FoundryUI<
            foundry.applications.sidebar.tabs.ActorDirectory,
            foundry.applications.sidebar.tabs.ItemDirectory,
            foundry.applications.sidebar.tabs.ChatLog,
            foundry.applications.sidebar.tabs.CompendiumDirectory,
            foundry.applications.sidebar.tabs.CombatTracker,
            foundry.applications.ui.Hotbar<foundry.documents.Macro>
        >;

        type DocumentTypeMap = {
            ActiveEffect: typeof foundry.documents.ActiveEffect;
            Actor: typeof foundry.documents.Actor;
            ActorDelta: typeof foundry.documents.ActorDelta;
            Adventure: typeof foundry.documents.Adventure;
            AmbientLight: typeof foundry.documents.AmbientLightDocument;
            AmbientSound: typeof foundry.documents.AmbientSoundDocument;
            Card: typeof foundry.documents.Card;
            Cards: typeof foundry.documents.Cards;
            ChatMessage: typeof foundry.documents.ChatMessage;
            Combat: typeof foundry.documents.Combat;
            Combatant: typeof foundry.documents.Combatant;
            CombatantGroup: typeof foundry.documents.CombatantGroup;
            Drawing: typeof foundry.documents.DrawingDocument;
            FogExploration: typeof foundry.documents.FogExploration;
            Folder: typeof foundry.documents.Folder;
            Item: typeof foundry.documents.Item;
            JournalEntry: typeof foundry.documents.JournalEntry;
            JournalEntryCategory: typeof foundry.documents.JournalEntryCategory;
            JournalEntryPage: typeof foundry.documents.JournalEntryPage;
            Macro: typeof foundry.documents.Macro;
            Note: typeof foundry.documents.NoteDocument;
            Playlist: typeof foundry.documents.Playlist;
            PlaylistSound: typeof foundry.documents.PlaylistSound;
            Region: typeof foundry.documents.RegionDocument;
            RegionBehavior: typeof foundry.documents.RegionBehavior;
            RollTable: typeof foundry.documents.RollTable;
            Scene: typeof foundry.documents.Scene;
            Setting: typeof foundry.documents.Setting;
            TableResult: typeof foundry.documents.TableResult;
            Tile: typeof foundry.documents.TileDocument;
            Token: typeof foundry.documents.TokenDocument;
            User: typeof foundry.documents.User;
            Wall: typeof foundry.documents.WallDocument;
        };

        function getDocumentClass<K extends keyof DocumentTypeMap>(name: K): DocumentTypeMap[K];
    }
}
