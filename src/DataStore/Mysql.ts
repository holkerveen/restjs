import {createConnection} from "mysql";

export default class Mysql implements DataStoreInterface, TransactionInterface {
    private connection: any;
    delete(tableName: string, id: Number): void {
    }

    endTransaction(): void {
    }

    find(tableName: string, id: Number): Promise<DataRow> {
        return undefined;
    }

    insert(tableName: string, data: DataRow | DataRow[]): Number {
        return 0;
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

    update(tableName: string, id: Number, data: DataRow | DataRow[]): void {
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