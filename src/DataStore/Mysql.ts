import {createConnection} from "mysql";

export default class Mysql implements DataStoreInterface, TransactionInterface {
    private connection: any;

    async delete(tableName: string, id: Number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.query(`DELETE FROM ?? WHERE id = ? LIMIT 1`, [tableName, id], (error: any, results: any) => {
                error ? reject(error) : resolve(results[0]);
            });
        })
    }

    async find(tableName: string, id: Number): Promise<DataRow> {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ?? WHERE id = ? LIMIT 1`, [tableName, id], (error: any, results: any) => {
                error ? reject(error) : resolve(results[0]);
            });
        });
    }

    async insert(tableName: string, data: DataRow): Promise<void> {
        if (data.id) throw Error("Cannot insert a model which already has an id");
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO ?? SET ?`, [tableName, data], (error: any, result: any) => {
                data.id = result.insertId;
                error ? reject(error) : resolve();
            });
        });
    }

    async query(tableName: string, conditions?: (Condition | ConditionGroup)): Promise<DataRow[]> {
        return new Promise((resolve,reject)=>{
            let where = "1";
            let queryParameters = [tableName];
            this.connection.query(`SELECT * FROM ?? WHERE ${where}`,queryParameters, (error:any,results:any)=>{
                if(error) reject(error);
                resolve(results);
            });
        });
    }

    rollback(): void {
    }

    startTransaction(): void {
    }

    endTransaction(): void {
    }

    async update(tableName: string, data: DataRow): Promise<void> {
        const id: number = data.id;
        if (!id) throw Error("Can only update already existing models");

        delete data.id;
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET ? WHERE id=? LIMIT 1`, [tableName, data, id], (error: any) => {
                if (error) reject(error);
                else {
                    data.id = id;
                    resolve();
                }
            });
        });
    }

    connect(config: {
        host: string,
        port: number
        username: string,
        password: string,
        database: string
    }) {
        this.connection = createConnection({
            host:config.host,
            port:config.port,
            user:config.username,
            password:config.password,
            database:config.database,
        });
        this.connection.connect((error:any) => {
            if(error) console.error("Mysql connect error", error);
        });
    }
}