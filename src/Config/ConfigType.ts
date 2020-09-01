export type ConfigType = {
    listen: {
        host: string,
        port: number,
    },
    database: {
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
    }
};
