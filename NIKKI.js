/**
 * ==========================================================
 * NIKKI AI
 * ----------------------------------------------------------
 * Main Engine
 *
 * Responsible For:
 * - Boot Sequence
 * - Module Initialization
 * - System Startup
 * - Health Check
 * - AI Lifecycle
 *
 * Founder:
 * Mr. Harsh Vardhan Singh Chouhan
 * ==========================================================
 */

// ==========================================================
// CORE
// ==========================================================

import CORE from "./core.js";

// ==========================================================
// AI MODULES
// ==========================================================

import BRAIN from "./brain.js";

import MEMORY from "./memory.js";

import SHORT_MEMORY from "./shortTermMemory.js";

import LONG_MEMORY from "./longTermMemory.js";

import EXPERIENCE_MEMORY from "./experienceMemory.js";

import KNOWLEDGE_BASE from "./knowledgeBase.js";

import LANGUAGE from "./language.js";

import VISION from "./vision.js";

import VOICE from "./voice.js";

import EMOTION from "./emotion.js";

import REASONING from "./reasoning.js";

import DECISION from "./decision.js";

import LEARNING from "./learning.js";

import PLANNING from "./planning.js";

import ACTION from "./action.js";

import REFLECTION from "./reflection.js";

import SEARCH from "./search.js";

// ==========================================================
// SYSTEM MODULES
// ==========================================================

import EVENT_BUS from "./eventBus.js";

import LOGGER from "./logger.js";

import TASK_MANAGER from "./taskManager.js";

import PERMISSION from "./permission.js";

import SECURITY from "./securityManager.js";

import API_MANAGER from "./apiManager.js";

import DEVICE_MANAGER from "./deviceManager.js";

import AUTOMATION from "./automation.js";

import WORKFLOW from "./workflowEngine.js";

import ANALYTICS from "./analytics.js";

import SETTINGS from "./settings.js";

import NETWORK from "./networkManager.js";

import UPDATE_MANAGER from "./updateManager.js";

import BACKUP_MANAGER from "./backupManager.js";

import DIAGNOSTICS from "./diagnostics.js";

import PERSONALITY from "./personality.js";

import ATTENTION from "./attention.js";

import CONSCIOUSNESS from "./consciousness.js";

import CONTEXT_MANAGER from "./contextManager.js";

import SCHEDULER from "./scheduler.js";

import NOTIFICATION from "./notification.js";

import PLUGIN_MANAGER from "./pluginManager.js";

// ==========================================================
// NIKKI ENGINE
// ==========================================================

class Nikki {

    constructor(){

        this.name = "NIKKI";

        this.version = "1.0.0";

        this.status = "OFFLINE";

        this.modules = [];

    }

}

// ==========================================================
// INITIALIZE NIKKI
// ==========================================================

initialize() {

    console.log("");

    console.log("======================================");

    console.log("Starting NIKKI AI...");

    console.log("Founder : Mr. Harsh Vardhan Singh Chouhan");

    console.log("Version :", this.version);

    console.log("======================================");

    this.status = "INITIALIZING";

    this.modules = [

        CORE,

        EVENT_BUS,

        LOGGER,

        SETTINGS,

        NETWORK,

        MEMORY,

        SHORT_MEMORY,

        LONG_MEMORY,

        EXPERIENCE_MEMORY,

        KNOWLEDGE_BASE,

        PERSONALITY,

        CONSCIOUSNESS,

        ATTENTION,

        CONTEXT_MANAGER,

        LANGUAGE,

        VOICE,

        VISION,

        EMOTION,

        REASONING,

        DECISION,

        LEARNING,

        PLANNING,

        SEARCH,

        ACTION,

        REFLECTION,

        TASK_MANAGER,

        PERMISSION,

        SECURITY,

        API_MANAGER,

        DEVICE_MANAGER,

        WORKFLOW,

        AUTOMATION,

        ANALYTICS,

        UPDATE_MANAGER,

        BACKUP_MANAGER,

        SCHEDULER,

        NOTIFICATION,

        PLUGIN_MANAGER,

        DIAGNOSTICS

    ];

    let initialized = 0;

    for (const module of this.modules) {

        try {

            if (module && typeof module.initialize === "function") {

                module.initialize();

                initialized++;

            }

        } catch (error) {

            console.error(

                "[Initialization Error]",

                error.message

            );

        }

    }

    this.status = "INITIALIZED";

    console.log("");

    console.log("Modules Initialized :", initialized);

    console.log("NIKKI Initialization Complete");

    console.log("");

    return {

        success: true,

        status: this.status,

        initializedModules: initialized

    };

}

// ==========================================================
// MODULE REGISTRY
// ==========================================================

registerModules() {

    this.registry = {};

    for (const module of this.modules) {

        try {

            if (!module) continue;

            const moduleName =

                module.name ||

                module.constructor?.name ||

                "Unknown";

            this.registry[moduleName] = module;

        }

        catch (error) {

            console.error(

                "[Registry Error]",

                error.message

            );

        }

    }

    console.log("");

    console.log("======================================");

    console.log("Module Registry Created");

    console.log(

        "Registered Modules :",

        Object.keys(this.registry).length

    );

    console.log("======================================");

    console.log("");

    return this.registry;

}

// ==========================================================
// GET MODULE
// ==========================================================

getModule(name) {

    return this.registry[name] || null;

}

// ==========================================================
// HAS MODULE
// ==========================================================

hasModule(name) {

    return name in this.registry;

}

// ==========================================================
// LIST MODULES
// ==========================================================

listModules() {

    return Object.keys(this.registry);

}

// ==========================================================
// BOOT NIKKI
// ==========================================================

async boot() {

    console.log("");

    console.log("======================================");

    console.log("Booting NIKKI AI...");

    console.log("======================================");

    this.status = "BOOTING";

    try {

        // Initialize Everything
        this.initialize();

        // Create Module Registry
        this.registerModules();

        // Run Diagnostics
        const diagnostics = this.getModule("Diagnostics Engine");

        if (diagnostics) {

            diagnostics.scan();

        }

        // Load Settings
        const settings = this.getModule("Settings Manager");

        if (settings) {

            console.log("Settings Loaded");

        }

        // Check Network
        const network = this.getModule("Network Manager");

        if (network) {

            console.log(

                "Network :",

                network.isOnline()

                    ? "ONLINE"

                    : "OFFLINE"

            );

        }

        // Ready
        this.status = "ONLINE";

        console.log("");

        console.log("======================================");

        console.log("NIKKI AI IS ONLINE");

        console.log("======================================");

        console.log("");

        return {

            success: true,

            status: this.status

        };

    }

    catch(error){

        this.status = "FAILED";

        console.error(

            "[BOOT ERROR]",

            error.message

        );

        return {

            success:false,

            error:error.message

        };

    }

}

// ==========================================================
// MAIN PROCESS PIPELINE
// ==========================================================

async process(input) {

    if (this.status !== "ONLINE") {

        return {

            success: false,

            error: "NIKKI is Offline"

        };

    }

    try {

        console.log("");

        console.log("======================================");

        console.log("Processing Request");

        console.log("User :", input);

        console.log("======================================");

        // STEP 1 : Brain
        const brain = this.getModule("Brain");

        const thought = brain.receive(input);

        // STEP 2 : Context
        const context = this.getModule("Context Manager");

        if (context && context.process) {

            context.process(thought);

        }

        // STEP 3 : Reasoning
        const reasoning = this.getModule("Reasoning");

        if (reasoning && reasoning.process) {

            reasoning.process(thought);

        }

        // STEP 4 : Decision
        const decision = this.getModule("Decision");

        if (decision && decision.process) {

            decision.process(thought);

        }

        // STEP 5 : Planning
        const planning = this.getModule("Planning");

        if (planning && planning.process) {

            planning.process(thought);

        }

        // STEP 6 : Workflow
        const workflow = this.getModule("Workflow Engine");

        if (workflow && workflow.process) {

            workflow.process(thought);

        }

        // STEP 7 : Security
        const security = this.getModule("Security Manager");

        if (security && security.process) {

            security.process(thought);

        }

        // STEP 8 : Permission
        const permission = this.getModule("Permission");

        if (permission && permission.process) {

            permission.process(thought);

        }

        // STEP 9 : Action
        const action = this.getModule("Action");

        let result = thought;

        if (action && action.process) {

            result = await action.process(thought);

        }

        // STEP 10 : Reflection
        const reflection = this.getModule("Reflection");

        if (reflection && reflection.process) {

            reflection.process(result);

        }

        // STEP 11 : Experience Memory
        const experience = this.getModule("Experience Memory");

        if (experience && experience.process) {

            experience.process(result);

        }

        // STEP 12 : Analytics
        const analytics = this.getModule("Analytics Engine");

        if (analytics && analytics.process) {

            analytics.process({

                module: "Brain",

                success: true,

                responseTime: 0

            });

        }

        return {

            success: true,

            result

        };

    }

    catch (error) {

        console.error(

            "[PROCESS ERROR]",

            error.message

        );

        return {

            success: false,

            error: error.message

        };

    }

}

// ==========================================================
// EVENT SYSTEM
// ==========================================================

connectEvents() {

    const events = this.getModule("Event Bus");

    if (!events) {

        console.warn("[NIKKI] Event Bus Not Found");

        return false;

    }

    // ==========================
    // System Events
    // ==========================

    events.on("system.boot", () => {

        LOGGER.log("System Boot Completed");

    });

    events.on("system.shutdown", () => {

        LOGGER.log("System Shutdown");

    });

    // ==========================
    // Brain Events
    // ==========================

    events.on("brain.processing", (data) => {

        LOGGER.log("Brain Processing", data);

    });

    events.on("brain.completed", (data) => {

        LOGGER.log("Brain Completed", data);

    });

    // ==========================
    // Action Events
    // ==========================

    events.on("action.start", (data) => {

        LOGGER.log("Action Started", data);

    });

    events.on("action.success", (data) => {

        LOGGER.log("Action Success", data);

    });

    events.on("action.failed", (data) => {

        LOGGER.error("Action Failed", data);

    });

    // ==========================
    // Security Events
    // ==========================

    events.on("security.denied", (data) => {

        LOGGER.warn("Permission Denied", data);

    });

    // ==========================
    // Network Events
    // ==========================

    events.on("network.online", () => {

        LOGGER.log("Internet Connected");

    });

    events.on("network.offline", () => {

        LOGGER.warn("Internet Disconnected");

    });

    console.log("Event System Connected");

    return true;

}

// ==========================================================
// EMIT EVENT
// ==========================================================

emit(event, data = {}) {

    const events = this.getModule("Event Bus");

    if (!events) return;

    events.emit(event, data);

}

// ==========================================================
// LISTEN EVENT
// ==========================================================

on(event, callback) {

    const events = this.getModule("Event Bus");

    if (!events) return;

    events.on(event, callback);

}

// ==========================================================
// SHUTDOWN NIKKI
// ==========================================================

async shutdown() {

    console.log("");

    console.log("======================================");

    console.log("Shutting Down NIKKI AI...");

    console.log("======================================");

    this.status = "SHUTTING_DOWN";

    try {

        // Notify System
        this.emit("system.shutdown");

        // Save Memory
        const memory = this.getModule("Memory");

        if (memory && memory.save) {

            await memory.save();

        }

        // Save Analytics
        const analytics = this.getModule("Analytics Engine");

        if (analytics && analytics.report) {

            analytics.report();

        }

        // Optional Backup
        const backup = this.getModule("Backup Manager");

        if (backup && backup.create) {

            backup.create({

                timestamp: Date.now(),

                reason: "System Shutdown"

            });

        }

        // Shutdown Modules (Reverse Order)
        for (let i = this.modules.length - 1; i >= 0; i--) {

            const module = this.modules[i];

            try {

                if (module && typeof module.shutdown === "function") {

                    module.shutdown();

                }

            }

            catch(error){

                console.error(

                    "[Shutdown Error]",

                    error.message

                );

            }

        }

        this.status = "OFFLINE";

        console.log("NIKKI AI Shutdown Complete");

        return {

            success: true,

            status: this.status

        };

    }

    catch(error){

        return {

            success: false,

            error: error.message

        };

    }

}

// ==========================================================
// RESTART NIKKI
// ==========================================================

async restart() {

    console.log("");

    console.log("Restarting NIKKI AI...");

    await this.shutdown();

    await this.boot();

    this.emit("system.restart");

    return {

        success: true,

        status: this.status

    };

}

// ==========================================================
// SYSTEM INFORMATION
// ==========================================================

info() {

    return {

        name: this.name,

        version: this.version,

        status: this.status,

        totalModules: this.modules.length,

        registeredModules: Object.keys(this.registry || {}).length,

        uptime: process.uptime ? process.uptime() : 0

    };

}

// ==========================================================
// SYSTEM HEALTH
// ==========================================================

health() {

    const diagnostics = this.getModule("Diagnostics Engine");

    if (

        diagnostics &&

        typeof diagnostics.health === "function"

    ) {

        return diagnostics.health();

    }

    return {

        overallHealth: "UNKNOWN"

    };

}

// ==========================================================
// RESET ENGINE
// ==========================================================

reset() {

    this.status = "OFFLINE";

    this.modules = [];

    this.registry = {};

}

// ==========================================================
// SINGLETON ENGINE
// ==========================================================

const NIKKI = new Nikki();

export default NIKKI;