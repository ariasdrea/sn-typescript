const spicedPg = require("spiced-pg");
import { genSalt, hash, compare } from "bcryptjs";

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/sn-typescript"
);

interface userInfo {
    first: string;
    last: string;
    email: string;
    password: string;
}

interface userId {
    userId: number;
}

export const registerUser = async ({
    first,
    last,
    email,
    password,
}: userInfo): Promise<userId> => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const { rows } = await db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, hashedPassword]
    );

    return rows[0].id;
};

export const getUserInfoByEmail = async (
    email: string
): Promise<{ id: number; password: string }> => {
    const { rows } = await db.query(
        `SELECT id, password FROM users WHERE email = $1`,
        [email]
    );

    return rows[0];
};

export const loginUser = (
    plainTxtPassword: string,
    hashedPassword: string
): Promise<boolean> => compare(plainTxtPassword, hashedPassword);

export const storeCode = async (
    code: string,
    email: string
): Promise<string> => {
    const { rows } = await db.query(
        `
        INSERT INTO reset_codes (code, email)
        VALUES ($1, $2)
        RETURNING code`,
        [code, email]
    );

    return rows[0].code;
};

export const retrieveCode = async (email: string) => {
    const { rows } = await db.query(
        ` 
        SELECT code FROM reset_codes
        WHERE email = $1 
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`,
        [email]
    );

    return rows;
};

export const updatePassword = (email, newPassword) =>
    db.query(
        `
        UPDATE users
        SET password = $2
        WHERE email = $1
    `,
        [email, newPassword]
    );
