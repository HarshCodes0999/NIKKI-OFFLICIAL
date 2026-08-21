import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

class GeminiProvider {

    constructor() {
        this.name = "GeminiProvider";
        this.status = "OFFLINE";
        this.ai = null;
    }

    initialize() {

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is missing");
        }

        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        this.status = "ONLINE";

        console.log("[GeminiProvider] Online");

    }

    async generate(input) {

        if (!this.ai) {
            throw new Error("GeminiProvider is not initialized");
        }

        const response = await this.ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: input
        });

        return response.text;
    }

    shutdown() {

        this.ai = null;
        this.status = "OFFLINE";

        console.log("[GeminiProvider] Offline");

    }

}

const GEMINI = new GeminiProvider();

export default GEMINI;
