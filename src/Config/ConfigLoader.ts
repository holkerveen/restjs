import * as fs from "fs";
import {ConfigType} from "./ConfigType";

export default class ConfigLoader {

    private static config: ConfigType = {
        listen: {
            host: 'localhost',
            port: 2000,
        },
        database: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: undefined,
            database: undefined,
        }
    };

    static load(argv: string[]): ConfigType {
        let options = JSON.parse(JSON.stringify(this.config));

        // Load config file if that is specified
        let pos = argv.indexOf('-f');
        if (pos !== -1) {
            options = JSON.parse(fs.readFileSync(argv[pos + 1], {encoding: 'utf-8'}));
        }

        // Inject environment variables
        options = ConfigLoader.injectEnv(options);

        return options;
    }

    private static injectEnv(config: ConfigType): ConfigType {
        // Parse env and build replacement map
        const filepath = '.env';
        const env: { [k: string]: string } = {};
        fs.readFileSync(filepath, {encoding: 'utf-8'}).split(/([\r\n]+)/).forEach((line, num) => {
            if (line.trim()[0] === '#') return;
            if (line.trim() === '') return;
            if (line.indexOf('=') === -1) throw Error(`Syntax error in env file '${filepath}' on line ${num}`);
            const split = line.split('=', 2);
            env[`%${split[0]}%`] = split[1];
        });

        return this.objectReplace(config, env);
    }

    public static objectReplace(object: any, replacements: { [k: string]: string }): ConfigType {
        let i: any;
        for (i in object) {
            if (!object.hasOwnProperty(i)) continue;
            if (typeof object[i] as any === "string") {
                for (const replacementSearch in replacements) {
                    object[i] = String(object[i]).replace(replacementSearch, replacements[replacementSearch]);
                }
            } else {
                object[i] = this.objectReplace(<ConfigType>object[i], replacements);
            }
        }
        return object;
    }

}
