import {createConnection} from "mysql";

export default class Mysql implements DataStoreInterface, TransactionInterface {
    constructor(private connection:any) {
    }

    delete(tableName: string, id: Number): void {
    }

    endTransaction(): void {
    }

    find(tableName: string, id: Number): DataRow {
        return undefined;
    }

    insert(tableName: string, data: DataRow | DataRow[]): Number {
        return 0;
    }

    query(tableName: string, conditions: Condition | ConditionGroup): DataRow[] {
        return [];
    }

    rollback(): void {
    }

    startTransaction(): void {
    }

    update(tableName: string, id: Number, data: DataRow | DataRow[]): void {
    }

    connect(config: {
        host: string,
        "user": string,
        "password": string,
        "database": string
    }) {
        this.connection = createConnection(config);
        this.connection.connect((error:any) => console.error("Mysql connect error", error));
    }
}