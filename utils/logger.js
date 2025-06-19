
import winston from "winston";

import {appMode} from "../config/index.js";


const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        debug: "blue",
    },
};

winston.addColors(customLevels.colors);

const createBaseLogger = () =>{
    return winston.createLogger({
        levels:customLevels.levels,
        format: winston.format.combine(
            winston.format.timestamp({format :'DD-MM-YYYY HH:mm:ss'}),
            winston.format.colorize({all:true}),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports :[
            new winston.transports.Console(appMode === 'development' ? {level:'debug'} : {level:'info'}),
            new winston.transports.File({filename:'logs/errors.log',level:'error'}),
            new winston.transports.File({filename:'logs/combined.log'}),
        ]

    })
}

const baseLogger = createBaseLogger();


export const createLogger = (context) =>{
    return {
        error: (message) => baseLogger.error(`[${context}] ${message}`),
        warn: (message) => baseLogger.warn(`[${context}] ${message}`),
        info: (message) => baseLogger.info(`[${context}] ${message}`),
        http: (message) => baseLogger.http(`[${context}] ${message}`),
        debug: (message) => baseLogger.debug(`[${context}] ${message}`),
    }
}
const defaultLoger = {
    error: (message) => baseLogger.error(`[${context}] ${message}`),
    warn: (message) => baseLogger.warn(`[${context}] ${message}`),
    info: (message) => baseLogger.info(`[${context}] ${message}`),
    http: (message) => baseLogger.http(`[${context}] ${message}`),
    debug: (message) => baseLogger.debug(`[${context}] ${message}`),
};
export default defaultLoger ;



