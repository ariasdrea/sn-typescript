const spicedPg = require("spiced-pg");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/sn-typescript"
);

type userInfo = {
    first: string;
    last: string;
    email: string;
    password: string;
};

type userId = {
    userId: number;
};

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
