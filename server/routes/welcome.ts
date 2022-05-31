import { Router } from "express";
const router = Router();
import cryptoRandomString from "crypto-random-string";
import { genSalt, hash } from "bcryptjs";
import {
    registerUser,
    getUserInfoByEmail,
    loginUser,
    storeCode,
    retrieveCode,
    updatePassword,
} from "../db";
import { sendEmail } from "../ses";

router.get("/userInfo.json", async (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

router.post("/register.json", async (req, res) => {
    try {
        const userId = await registerUser(req.body);
        req.session.userId = userId;
        res.json({ success: true });
    } catch (e) {
        console.error("e in /register.json", e);
        res.json({ success: false });
    }
});

router.post("/login.json", async (req, res) => {
    try {
        const { id: userId, password: hashedPassword } =
            await getUserInfoByEmail(req.body.email);
        const match = await loginUser(req.body.password, hashedPassword);

        if (match) {
            req.session.userId = userId;
            res.json({ success: true });
        }
    } catch (e) {
        console.log("e in /login.json", e);
        res.json({ success: false });
    }
});

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

router.post("/reset.json", async (req, res) => {
    try {
        const { id } = await getUserInfoByEmail(req.body.email);

        if (id) {
            const secretCode = cryptoRandomString({ length: 6 });
            const code = await storeCode(secretCode, req.body.email);
            await sendEmail(code, req.body.email);

            res.json({ success: true });
        }
    } catch (e) {
        console.log("e in reset.json", e);
        res.json({ success: true });
    }
});

router.post("/reset-verify.json", async (req, res) => {
    const { email, code, password } = req.body;
    try {
        const result = await retrieveCode(email);
        const match = result.find((elem) => elem.code === code);

        if (match) {
            const salt = await genSalt();
            const hashedPassword = await hash(password, salt);
            await updatePassword(email, hashedPassword);

            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (e) {
        console.log("e in reset-verify.json", e);
        res.json({ success: false });
    }
});

export default router;
