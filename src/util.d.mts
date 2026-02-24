import { abstract } from "#client/_module.mjs";
import { DocumentConstructionContext } from "#common/_types.mjs";
import { EmbeddedCollectionField, EmbeddedDocumentField } from "#common/data/fields.mjs";
import { DataSchema, DatabaseBackend, DatabaseUpdateOperation, Document, DocumentMetadata } from "./common/abstract/_module.mjs";
import type DataModel from "./common/abstract/data.mjs";
import Collection from "./common/utils/collection.mjs";

declare global {
    type Maybe<T> = T | null | undefined;

    type MaybePromise<T> = T | Promise<T>;

    type DeepPartial<T> = T extends Date | FileList | File | NestedValue | Document | Function
        ? T
        : T extends (infer U)[]
          ? DeepPartial<U>[]
          : { [K in keyof T]?: ExtractObjects<T[K]> extends never ? T[K] : DeepPartial<T[K]> };

    type DeepReadonly<T> = {
        readonly [K in keyof T]: T[K] extends undefined | null | boolean | number | string | symbol | bigint | Function
            ? T[K]
            : T[K] extends Array<infer V>
              ? ReadonlyArray<DeepReadonly<V>>
              : T[K] extends Map<infer K_1, infer V>
                ? ReadonlyMap<DeepReadonly<K_1>, DeepReadonly<V>>
                : T[K] extends Set<infer V_1>
                  ? ReadonlySet<DeepReadonly<V_1>>
                  : DeepReadonly<T[K]>;
    };

    type CollectionValue<T> = T extends Collection<string, infer U> ? U : never;

    type AnyConstructor = abstract new (...args: never) => unknown;

    type AnyConcreteConstructor = new (...args: never) => unknown;

    type AbstractConstructorOf<T> = abstract new (...args: any[]) => T;

    type ConstructorOf<T> = new (...args: any[]) => T;

    type DocumentClassOf<TDocument extends foundry.abstract.Document> = {
        new (data: PreCreate<TDocument["_source"]>, context?: DocumentConstructionContext<TDocument["parent"]>): TDocument;
        readonly collectionName: string;
        readonly database: DatabaseBackend;
        readonly documentName: string;
        readonly hasTypeData: boolean;
        readonly hierarchy: Record<string, EmbeddedCollectionField<abstract.Document<abstract.Document>> | EmbeddedDocumentField<abstract.Document>>;
        readonly metadata: DocumentMetadata;
        readonly schema: foundry.data.fields.SchemaField<DataSchema>;
        readonly TYPES: string[];
    };

    type DocumentConstructorOf<T extends foundry.abstract.Document> = {
        new (...args: any[]): T;
        updateDocuments(updates?: object[], operation?: Partial<DatabaseUpdateOperation<T["parent"]>>): Promise<T[]>;
    };

    type ParentOf<TDataModel> = TDataModel extends DataModel<infer P extends DataModel | null> ? P : never;

    type SchemaOf<TDataModel> = TDataModel extends DataModel<infer _P, infer S extends DataSchema> ? S : never;

    type SetElement<TSet extends Set<unknown>> = TSet extends Set<infer TElement> ? TElement : never;

    type DropFirst<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never;

    type ValueOf<T extends object> = T[keyof T];

    type ExtractKeys<T extends Record<string, unknown>, V extends PropertyKey = PropertyKey> = {
        [K in keyof T]: T[K] extends V ? K : never;
    }[keyof T];

    type WithRequired<T extends Record<string, unknown>, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

    type WithPartial<T extends Record<string, unknown>, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    type PartialRecord<K extends PropertyKey, V> = Partial<Record<K, V>>;

    /** A JSON-compatible value, plus `undefined` */
    type JSONValue = string | number | boolean | object | null | undefined;

    type Point = { x: number; y: number };

    type PointArray = [x: number, y: number];

    type ElevatedPoint = Point & { elevation: number };

    type Rectangle = { x: number; y: number; width: number; height: number };
}

type ExtractObjects<T> = T extends infer U ? (U extends object ? U : never) : never;

declare const $NestedValue: unique symbol;

type NestedValue<TValue extends object = object> = { [$NestedValue]: never } & TValue;

export {};
