import * as program from 'commander';
export declare function runProgram(clients: {
    addCommands: (program: program.CommanderStatic) => void;
}[]): void;
export declare function confirm(text?: string, defaultAnswer?: boolean): Promise<boolean>;
export declare function prompt(questions: any[]): Promise<any>;
export declare type Program = typeof program;
