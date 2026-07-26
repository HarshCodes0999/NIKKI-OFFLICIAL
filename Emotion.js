/**
 * ==========================================================
 * NIKKI EMOTION MODULE
 * ----------------------------------------------------------
 * Responsible For:
 * - Managing Behaviour State
 * - Tracking Mood
 * - Affecting Responses
 * ==========================================================
 */

class EmotionModule {

    constructor() {

        this.name = "Emotion";

        this.version = "1.0.0";

        this.status = "Offline";

        this.current = "NEUTRAL";

    }

    initialize() {

        this.status = "Online";

        console.log("[Emotion] Initialized");

    }

    process(state) {

        return this.change(state);

    }

    change(state) {

        const allowed = [

            "NEUTRAL",

            "LISTENING",

            "THINKING",

            "FOCUSED",

            "LEARNING",

            "SUCCESS",

            "WARNING",

            "ERROR"

        ];

        if(allowed.includes(state)){

            this.current = state;

        }

        return {

            success:true,

            module:this.name,

            timestamp:Date.now(),

            data:{

                emotion:this.current

            }

        };

    }

    currentState(){

        return this.current;

    }

    status(){

        return{

            module:this.name,

            version:this.version,

            status:this.status,

            emotion:this.current

        };

    }

    shutdown(){

        this.status="Offline";

    }

}

const EMOTION = new EmotionModule();

export default EMOTION;