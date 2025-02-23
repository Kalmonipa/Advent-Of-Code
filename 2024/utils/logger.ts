// src/utils/logger.ts

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
}

export class Logger {
    private currentLevel: LogLevel;

    constructor(level: LogLevel = LogLevel.INFO) {
        this.currentLevel = level;
    }

    setLevel(level: LogLevel) {
        this.currentLevel = level;
    }

    log(level: LogLevel, message: string, ...optionalParams: any[]) {
        if (level <= this.currentLevel) {
            console.log(message, ...optionalParams.flat());
        }
    }    

    error(message: string, ...optionalParams: any[]) {
        this.log(LogLevel.ERROR, message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]) {
        this.log(LogLevel.WARN, message, ...optionalParams);
    }

    info(message: string, ...optionalParams: any[]) {
        this.log(LogLevel.INFO, message, ...optionalParams);
    }

    debug(message: string, ...optionalParams: any[]) {
        this.log(LogLevel.DEBUG, message, ...optionalParams);
    }
}

export function createLogger(level: LogLevel = LogLevel.INFO): Logger {
    return new Logger(level);
}
