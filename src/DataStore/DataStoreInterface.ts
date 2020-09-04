type DataRow = { [key: string]: any };
type Operation = 'eq' | 'neq' | 'null' | 'lt' | 'gt' | 'like';
type Condition = { column: string, operation: Operation, value: string };
type ConditionGroup = { type: 'and' | 'or', conditions: (Condition | ConditionGroup)[] };

interface DataStoreInterface {

    insert(tableName: string, data: DataRow): Promise<void>;

    update(tableName: string, data: DataRow): Promise<void>;

    delete(tableName: string, id: Number): Promise<void>;

    find(tableName: string, id: Number): Promise<DataRow>;

    query(tableName: string, conditions?: (Condition | ConditionGroup)): Promise<DataRow[]>;
}