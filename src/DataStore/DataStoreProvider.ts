import Mysql from "./Mysql";
import ConfigProvider from "../Config/ConfigProvider";

const config = ConfigProvider.getConfig();

const mysql = new Mysql();
mysql.connect(config.database);

export default class DataStoreProvider {
    static getDataStore(): DataStoreInterface {
        return mysql;
    }
}