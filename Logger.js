/**
 * ==========================================================
 * NIKKI LOGGER SYSTEM
 * ----------------------------------------------------------
 * Responsible For:
 * - Recording System Logs
 * - Errors
 * - Warnings
 * - Information
 * - Debug Messages
 * ==========================================================
 */

class Logger {

    constructor() {

        this.name = "Logger";

        this.logs = [];

        this.maxLogs = 1000;

    }

    log(level, source, message, data = null) {

        const entry = {

            id: this.logs.length + 1,

            level,

            source,

            message,

            data,

            timestamp: new Date().toISOString()

        };

        this.logs.push(entry);

        if(this.logs.length > this.maxLogs){

            this.logs.shift();

        }

        console.log(
            `[${level}] [${source}] ${message}`
        );

        return entry;

    }

    info(source, message, data = null){

        return this.log("INFO", source, message, data);

    }

    warning(source, message, data = null){

        return this.log("WARNING", source, message, data);

    }

    error(source, message, data = null){

        return this.log("ERROR", source, message, data);

    }

    debug(source, message, data = null){

        return this.log("DEBUG", source, message, data);

    }

    history(){

        return this.logs;

    }

    clear(){

        this.logs = [];

    }

}

const LOGGER = new Logger();

export default LOGGER;