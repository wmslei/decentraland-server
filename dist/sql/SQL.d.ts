export declare class SQLStatement {
    queryParts: string[];
    values: any[];
    name: string;
    constructor(queryParts: TemplateStringsArray, values: any[]);
    getLeftQueryPart(queryParts: string[], index: number): string;
    getMiddleQueryParts(queryParts: string[]): string[];
    getRightQueryPart(queryParts: string[], index: number): string;
    get text(): string;
    append(statement: SQLStatement | string): SQLStatement;
    setName(name: string): SQLStatement;
}
export interface SQLInterface {
    (queryParts: TemplateStringsArray | string[], ...args: any[]): SQLStatement;
    raw(value: any): SQLStatement;
}
export declare const SQL: SQLInterface;
export declare function raw(value: string | number): SQLStatement;
