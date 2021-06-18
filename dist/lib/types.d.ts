declare type configOptionType = {
    port: number;
    dir?: string;
    secret: string;
    provider: string;
    path: string;
    branch: string;
    cmd: string;
    inited?: boolean;
};
declare type resolvedPayloadType = {
    header: any;
    payload: any;
};
export { configOptionType, resolvedPayloadType };
