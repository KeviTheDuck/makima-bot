//const sqlite3 = require("sqlite3").verbose();
const { createLogger, format, transports } = require("winston");
import { ID, getDate, getTime } from "./neededVars";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: "makima-bot" },
    transports: [
        new transports.File({
            filename: "./logs/db-error.log",
            level: "error",
        }),
        new transports.File({ filename: "./logs/db-combined.log" }),
    ],
});






























/*
let db = new sqlite3.Database(
    "./db/messages.db",
    sqlite3.OPEN_READWRITE,
    (err: any) => {
        if (err) {
            logger.error(err.message);
            //return console.error(err.message)
        }
        logger.info("Connected to messages.db");
        //console.log('Connected to the in-memory SQlite database');
    }
);


export function insertMessages(message: string, author: string, from: string) {
    var sql: string =
        "INSERT INTO messages (ID, message,author, messageFrom, date, time) VALUES(?,?,?,?,?,?,?)";
    db.run(
        sql,
        [ID(), message, author, from, getDate(), getTime()],
        (err: any) => {
            if (err) {
                logger.error(err.message);
            }
            logger.info(`Logged message with ID: ${ID()}`);
        }
    );
}


export function addWoof(woofs: number, xp: number, author: string) {
    //var sql: string ="INSERT INTO woofs (woofs,xp,author) VALUES(?,?,?)";
    const sql: string = `UPDATE woofs
            SET woofs = ?,
            SET xp = ?
            WHERE author = ?`;
    db.run(sql, [woofs, xp, author], (err: any) => {
        if (err) {
            logger.error(err.message);
        }
        logger.info(`Logged message with ID: ${ID()}`);
    });
}

export async function getWoof(author: string): Promise<number> {
    const sql = `SELECT woofs FROM wooofs WHERE author=?`;

    return new Promise<number>((resolve) =>
        db.all(
            sql,
            [author],
            async (err: Error | null, rows: [{ woofs: number }]) => {
                if (err) throw err;

                resolve(rows[0].woofs);
            }
        )
    );
}

export async function checkWoof(author: string) {
    const sql = "SELECT EXISTS(SELECT 1 FROM wooofs WHERE author=?);";
}
**/
