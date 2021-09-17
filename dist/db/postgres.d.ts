import * as pg from 'pg';
import { Column, OrderClause, QueryArgument, QueryPart, OnConflict } from './types';
export declare class Postgres {
    client: pg.Client;
    connect(connectionString?: string): Promise<pg.Client>;
    query(queryString: string | QueryArgument, values?: any[]): Promise<any[]>;
    count(tableName: string, conditions: QueryPart, extra?: string): Promise<{
        count: string;
    }[]>;
    select(tableName: string, conditions?: QueryPart, orderBy?: QueryPart, extra?: string): Promise<any>;
    selectOne(tableName: string, conditions?: QueryPart, orderBy?: QueryPart): Promise<any>;
    insert(tableName: string, changes: QueryPart, primaryKey?: string, onConflict?: OnConflict): Promise<any>;
    update(tableName: string, changes: QueryPart, conditions: QueryPart): Promise<any>;
    delete(tableName: string, conditions: QueryPart): Promise<any>;
    createTable(tableName: string, rows: string[], options?: {
        sequenceName?: string;
        primaryKey?: string;
    }): Promise<void>;
    createIndex(tableName: string, name: string, fields: string[], conditions?: {
        unique?: boolean;
    }): Promise<pg.QueryResult<any>>;
    createSequence(name: string): Promise<pg.QueryResult<any>> | undefined;
    alterSequenceOwnership(name: string, owner: string, columnName?: string): Promise<pg.QueryResult<any>>;
    truncate(tableName: string): Promise<pg.QueryResult<any>>;
    toOnConflictUpsert({ target, changes }: OnConflict, indexStart?: number): string;
    toColumnFields(columns: Column): string[];
    toAssignmentFields(columns: Column, start?: number): string[];
    toValuePlaceholders(columns: Column, start?: number): string[];
    getOrderValues(order: OrderClause): string[];
    setTypeParser(oid: number, parser: (value: any) => any): void;
    close(): Promise<void>;
    private _query;
}
export declare const postgres: Postgres;
