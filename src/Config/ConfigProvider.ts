import {ConfigType} from "./ConfigType";
import ConfigLoader from "./ConfigLoader";

export default class ConfigProvider {
    private static config: ConfigType;

    static getConfig(): ConfigType {
        if (!this.config) this.config = ConfigLoader.load(process.argv);
        return this.config;
    }
}