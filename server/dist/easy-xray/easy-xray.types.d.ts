export declare namespace XrayConfig {
    interface ServerConfig {
        log: Log;
        stats: Stats;
        policy: Policy;
        api: Api;
        routing: Routing;
        inbounds: Inbound[];
        outbounds: Outbound[];
    }
    interface Log {
        access: string;
        error: string;
        loglevel: string;
        dnsLog: boolean;
    }
    interface Stats {
    }
    interface Policy {
        levels: Levels;
        system: System;
    }
    interface Levels {
        0: Level;
    }
    interface Level {
        statsUserUplink: boolean;
        statsUserDownlink: boolean;
    }
    interface System {
        statsOutboundUplink: boolean;
        statsOutboundDownlink: boolean;
    }
    interface Api {
        tag: string;
        services: string[];
    }
    interface Routing {
        domainStrategy: string;
        rules: RulesItem[];
    }
    interface RulesItem {
        type: string;
        inboundTag?: string[];
        outboundTag: string;
        network?: string;
        ip?: string[];
        protocol?: string[];
        port?: string;
        sourcePort?: string;
        domain?: string[];
    }
    interface Inbound {
        listen: string;
        port: number;
        protocol: string;
        settings: Settings;
        tag?: string;
        streamSettings?: StreamSettings;
        sniffing?: Sniffing;
    }
    interface Settings {
        address?: string;
        clients?: Client[];
        decryption?: string;
    }
    interface Client {
        id: string;
        email?: string;
        flow?: string;
    }
    interface StreamSettings {
        network: string;
        security?: string;
        realitySettings?: RealitySettings;
        grpcSettings?: GrpcSettings;
    }
    interface RealitySettings {
        show: boolean;
        dest: string;
        xver: number;
        serverNames: string[];
        privateKey: string;
        shortIds: string[];
    }
    interface Sniffing {
        enabled: boolean;
        destOverride: string[];
        routeOnly: boolean;
    }
    interface GrpcSettings {
        serviceName: string;
    }
    interface Outbound {
        protocol: string;
        tag: string;
    }
}
