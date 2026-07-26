/**
 * ==========================================================
 * NIKKI NETWORK MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Network Status
 * - Connectivity Monitoring
 * - Network Requests Validation
 * - Online / Offline Detection
 * ==========================================================
 */

class NetworkManager {

    constructor() {

        this.name = "Network Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.online = false;

        this.networkType = "Unknown";

        this.lastChecked = null;

    }

    initialize() {

        this.status = "Online";

        console.log("[NetworkManager] Initialized");

    }

    update(status) {

        this.online = status.online;

        this.networkType = status.type || "Unknown";

        this.lastChecked = Date.now();

        return {

            success: true,

            online: this.online,

            networkType: this.networkType

        };

    }

    isOnline() {

        return this.online;

    }

    isOffline() {

        return !this.online;

    }

    getType() {

        return this.networkType;

    }

    process(data) {

        return this.update(data);

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            online: this.online,

            networkType: this.networkType,

            lastChecked: this.lastChecked

        };

    }

    shutdown() {

        this.status = "Offline";

        this.online = false;

    }

}

const NETWORK = new NetworkManager();

export default NETWORK;