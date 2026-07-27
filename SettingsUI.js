import SETTINGS from "./Brain/Settings.js";

window.addEventListener("DOMContentLoaded", () => {

    SETTINGS.initialize();

    // ==========================
    // AI Mode
    // ==========================

    const aiMode = document.getElementById("aiMode");

    if(aiMode){

        aiMode.value = SETTINGS.get("aiMode");

        aiMode.addEventListener("change", () => {

            SETTINGS.set("aiMode", aiMode.value);

            console.log("AI Mode:", aiMode.value);

        });

    }

    // ==========================
    // Language
    // ==========================

    const language = document.getElementById("language");

    if(language){

        language.value = SETTINGS.get("language");

        language.addEventListener("change", () => {

            SETTINGS.set("language", language.value);

            console.log("Language:", language.value);

        });

    }

    // ==========================
    // Response Style
    // ==========================

    const responseStyle = document.getElementById("responseStyle");

    if(responseStyle){

        responseStyle.value = SETTINGS.get("responseStyle");

        responseStyle.addEventListener("change", () => {

            SETTINGS.set(

                "responseStyle",

                responseStyle.value

            );

        });

    }

});

// ==========================
// Response Speed
// ==========================

const responseSpeed = document.getElementById("responseSpeed");

if(responseSpeed){

    responseSpeed.value = SETTINGS.get("responseSpeed");

    responseSpeed.addEventListener("change", () => {

        SETTINGS.set(

            "responseSpeed",

            responseSpeed.value

        );

    });

}

// ==========================
// Notifications
// ==========================

const notifications = document.getElementById("notifications");

if(notifications){

    notifications.checked = SETTINGS.get("notifications");

    notifications.addEventListener("change", () => {

        SETTINGS.set(

            "notifications",

            notifications.checked

        );

    });

}

// ==========================
// Auto Sync
// ==========================

const autoSync = document.getElementById("autoSync");

if(autoSync){

    autoSync.checked = SETTINGS.get("autoSync");

    autoSync.addEventListener("change", () => {

        SETTINGS.set(

            "autoSync",

            autoSync.checked

        );

    });

}

// ==========================
// Backup
// ==========================

const backupBtn = document.getElementById("backupNow");

if(backupBtn){

    backupBtn.addEventListener("click", () => {

        const result = SETTINGS.createBackup();

        alert(result.message);

        console.log(result);

    });

}

// ==========================
// Check Updates
// ==========================

const updateBtn = document.getElementById("checkUpdates");

if(updateBtn){

    updateBtn.addEventListener("click", () => {

        const result = SETTINGS.checkUpdates();

        alert(result.message);

        console.log(result);

    });

}

// ==========================
// Load Saved Settings
// ==========================

const savedSettings = localStorage.getItem("nikkiSettings");

if(savedSettings){

    SETTINGS.import(

        JSON.parse(savedSettings)

    );

}

// ==========================
// Save Settings
// ==========================

function saveSettings(){

    localStorage.setItem(

        "nikkiSettings",

        JSON.stringify(

            SETTINGS.export()

        )

    );

}

// ==========================
// Auto Save
// ==========================

window.addEventListener("beforeunload", () => {

    saveSettings();

});

// ==========================
// Export Settings
// ==========================

window.exportSettings = () => {

    console.log(

        SETTINGS.export()

    );

};

// ==========================
// Reset Settings
// ==========================

window.resetSettings = () => {

    SETTINGS.reset();

    saveSettings();

    location.reload();

};

console.log("Settings UI Loaded Successfully");
