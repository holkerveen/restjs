import {readFileSync} from "fs";
import Mysql from "./database/Mysql";

const container: { config?: any, database?: any } = {};
container.config = JSON.parse(readFileSync(`${process.cwd()}/config.prod.json`, {encoding: 'utf8'}));

const mysql = new Mysql(container.config.database);
mysql.connect(container.config.database);

export default container;
