import express, { Express } from "express";
import compression from "compression";
import cookieSession from "cookie-session";
import path from "path";
import { registerUser } from "./db";

const app: Express = (exports.app = express());
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true,
});

app.use(cookieSessionMiddleware);
app.use(compression());
app.use(express.json());
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/userInfo.json", async (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register.json", async (req, res) => {
    try {
        const userId = await registerUser(req.body);
        req.session.userId = userId;
        res.json({ success: true });
    } catch (e) {
        console.error("e in /register.json", e);
        res.json({ success: false });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("I'm listening."));
