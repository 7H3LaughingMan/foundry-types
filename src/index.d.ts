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
            foundry.documents.MeasuredTemplateDocument<foundry.documents.Scene | null>,
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

        function getDocumentClass(name: "ActiveEffect"): typeof foundry.documents.ActiveEffect;
        function getDocumentClass(name: "Actor"): typeof foundry.documents.Actor;
        function getDocumentClass(name: "ActorDelta"): typeof foundry.documents.ActorDelta;
        function getDocumentClass(name: "Adventure"): typeof foundry.documents.Adventure;
        function getDocumentClass(name: "AmbientLight"): typeof foundry.documents.AmbientLightDocument;
        function getDocumentClass(name: "AmbientSound"): typeof foundry.documents.AmbientSoundDocument;
        function getDocumentClass(name: "Card"): typeof foundry.documents.Card;
        function getDocumentClass(name: "Cards"): typeof foundry.documents.Cards;
        function getDocumentClass(name: "ChatMessage"): typeof foundry.documents.ChatMessage;
        function getDocumentClass(name: "Combat"): typeof foundry.documents.Combat;
        function getDocumentClass(name: "Combatant"): typeof foundry.documents.Combatant;
        function getDocumentClass(name: "CombatantGroup"): typeof foundry.documents.CombatantGroup;
        function getDocumentClass(name: "Drawing"): typeof foundry.documents.DrawingDocument;
        function getDocumentClass(name: "FogExploration"): typeof foundry.documents.FogExploration;
        function getDocumentClass(name: "Folder"): typeof foundry.documents.Folder;
        function getDocumentClass(name: "Item"): typeof foundry.documents.Item;
        function getDocumentClass(name: "JournalEntry"): typeof foundry.documents.JournalEntry;
        function getDocumentClass(name: "JournalEntryCategory"): typeof foundry.documents.JournalEntryCategory;
        function getDocumentClass(name: "JournalEntryPage"): typeof foundry.documents.JournalEntryPage;
        function getDocumentClass(name: "Macro"): typeof foundry.documents.Macro;
        function getDocumentClass(name: "MeasuredTemplate"): typeof foundry.documents.MeasuredTemplateDocument;
        function getDocumentClass(name: "Note"): typeof foundry.documents.NoteDocument;
        function getDocumentClass(name: "Playlist"): typeof foundry.documents.Playlist;
        function getDocumentClass(name: "PlaylistSound"): typeof foundry.documents.PlaylistSound;
        function getDocumentClass(name: "Region"): typeof foundry.documents.RegionDocument;
        function getDocumentClass(name: "RegionBehavior"): typeof foundry.documents.RegionBehavior;
        function getDocumentClass(name: "RollTable"): typeof foundry.documents.RollTable;
        function getDocumentClass(name: "Scene"): typeof foundry.documents.Scene;
        function getDocumentClass(name: "Setting"): typeof foundry.documents.Setting;
        function getDocumentClass(name: "TableResult"): typeof foundry.documents.TableResult;
        function getDocumentClass(name: "Tile"): typeof foundry.documents.TileDocument;
        function getDocumentClass(name: "Token"): typeof foundry.documents.TokenDocument;
        function getDocumentClass(name: "User"): typeof foundry.documents.User;
        function getDocumentClass(name: "Wall"): typeof foundry.documents.WallDocument;
        function getDocumentClass<T extends foundry.abstract.Document>(name: DocumentType): ConstructorOf<T>;
    }
}
