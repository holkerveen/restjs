type DataRow = { [key: string]: any };
type Operation = 'eq' | 'neq' | 'null' | 'lt' | 'gt' | 'like';
type Condition = { column: string, operation: Operation, value: string };
type ConditionGroup = { type: 'and' | 'or', conditions: (Condition | ConditionGroup)[] };

interface DataStoreInterface {

    insert(tableName: string, data: DataRow | DataRow[]): Number;

    update(tableName: string, id: Number, data: DataRow | DataRow[]): void;

    delete(tableName: string, id: Number): void;

    find(tableName: string, id: Number): Promise<DataRow>;

    query(tableName: string, conditions?: (Condition | ConditionGroup)): Promise<DataRow[]>;
}