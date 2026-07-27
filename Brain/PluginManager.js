/**
 * ==========================================================
 * NIKKI PLUGIN MANAGER
 * ----------------------------------------------------------
 * Responsible For:
 * - Registering Plugins
 * - Loading Plugins
 * - Unloading Plugins
 * - Managing Plugin Lifecycle
 * ==========================================================
 */

class PluginManager {

    constructor() {

        this.name = "Plugin Manager";

        this.version = "1.0.0";

        this.status = "Offline";

        this.plugins = {};

    }

    initialize() {

        this.status = "Online";

        console.log("[PluginManager] Initialized");

    }

    register(plugin) {

        this.plugins[plugin.name] = plugin;

    }

    get(name) {

        return this.plugins[name] || null;

    }

    execute(name, data = {}) {

        const plugin = this.get(name);

        if (!plugin) {

            return {

                success: false,

                message: "Plugin Not Found"

            };

        }

        return plugin.process(data);

    }

    unload(name) {

        delete this.plugins[name];

    }

    list() {

        return Object.keys(this.plugins);

    }

    status() {

        return {

            module: this.name,

            version: this.version,

            status: this.status,

            totalPlugins: this.list().length

        };

    }

    shutdown() {

        this.plugins = {};

        this.status = "Offline";

    }

}

const PLUGINS = new PluginManager();

export default PLUGINS;