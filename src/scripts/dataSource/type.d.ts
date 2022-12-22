export interface DSConnection {
    host: string;
    port: number;
    dialect: string;
    database?: string;
    username: string;
    password: string;
}

export default interface Datasource extends DSConnection {
    name: string;
    type: string;
}
