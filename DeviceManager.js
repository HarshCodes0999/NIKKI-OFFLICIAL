/**
 * ==========================================================
 * NIKKI DEVICE MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Device Registration
 * - Driver Management
 * - Device Communication
 * - Hardware Abstraction
 * ==========================================================
 */

class DeviceManager {

    constructor() {

        this.name = "Device Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.devices = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[DeviceManager] Initialized");

    }

    register(device) {

        this.devices[device.name] = device;

        return {

            success: true,

            device: device.name

        };

    }

    get(name) {

        return this.devices[name] || null;

    }

    execute(name, action, data = {}) {

        const device = this.get(name);

        if (!device) {

            return {

                success: false,

                message: "Device Not Found"

            };

        }

        if (typeof device.execute !== "function") {

            return {

                success: false,

                message: "Invalid Device Driver"

            };

        }

        return device.execute(action, data);

    }

    unregister(name) {

        delete this.devices[name];

    }

    list() {

        return Object.keys(this.devices);

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            registeredDevices: this.list().length

        };

    }

    shutdown() {

        this.devices = {};

        this.status = "Offline";

    }

}

const DEVICE_MANAGER = new DeviceManager();

export default DEVICE_MANAGER;