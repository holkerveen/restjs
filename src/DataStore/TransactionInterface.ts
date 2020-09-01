interface TransactionInterface {
    startTransaction(): void;

    endTransaction(): void;

    rollback(): void;
}