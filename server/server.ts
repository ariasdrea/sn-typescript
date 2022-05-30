import express, { Express } from "express";
import compression from "compression";
import cookieSession from "cookie-session";
import path from "path";
import welcomeRouter from "./routes/welcome";

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

app.use("/", welcomeRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("I'm listening."));
