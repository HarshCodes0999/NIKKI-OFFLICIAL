import "dotenv/config";
import express from "express";
import cors from "cors";
import GEMINI from "./providers/GeminiProvider.js";

const app = express();
const PORT = process.env.PORT || 3000;;

app.use(cors());
app.use(express.json());

/* =========================
   Initialize API
========================= */

try {

    GEMINI.initialize();

    console.log("[NIKKI] API connection ready");

} catch (error) {

    console.error("[NIKKI] API connection failed");
}

/* =========================
   Health Check
========================= */

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        system: "NIKKI",

        api: GEMINI.status

    });

});

/* =========================
   Chat API
========================= */

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message || !message.trim()) {

            return res.status(400).json({

                success: false,

                response: "Please enter a message."

            });

        }

        const response = await GEMINI.generate(message);

        res.json({

            success: true,

            response

        });

    } catch (error) {

        console.error("[NIKKI] API error:", error.message);

        res.status(500).json({

            success: false,

            response: "NIKKI is unable to respond right now."

        });

    }

});

/* =========================
   Start Server
========================= */

app.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("==============================");
    console.log("NIKKI API ONLINE");
    console.log(`http://localhost:${PORT}`);
    console.log("==============================");
    console.log("");

});
