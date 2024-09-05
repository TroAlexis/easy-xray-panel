// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace XrayConfig {
  export interface ServerConfig {
    log: Log;
    stats: Stats;
    policy: Policy;
    api: Api;
    routing: Routing;
    inbounds: Inbound[];
    outbounds: Outbound[];
  }

  export interface Log {
    access: string;
    error: string;
    loglevel: string;
    dnsLog: boolean;
  }

  export interface Stats {}

  export interface Policy {
    levels: Levels;
    system: System;
  }

  export interface Levels {
    0: Level;
  }

  export interface Level {
    statsUserUplink: boolean;
    statsUserDownlink: boolean;
  }

  export interface System {
    statsOutboundUplink: boolean;
    statsOutboundDownlink: boolean;
  }

  export interface Api {
    tag: string;
    services: string[];
  }

  export interface Routing {
    domainStrategy: string;
    rules: RulesItem[];
  }

  export interface RulesItem {
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

  export interface Inbound {
    listen: string;
    port: number;
    protocol: string;
    settings: Settings;
    tag?: string;
    streamSettings?: StreamSettings;
    sniffing?: Sniffing;
  }

  export interface Settings {
    address?: string;
    clients?: Client[];
    decryption?: string;
  }

  export interface Client {
    id: string;
    email?: string;
    flow?: string;
  }

  export interface StreamSettings {
    network: string;
    security?: string;
    realitySettings?: RealitySettings;
    grpcSettings?: GrpcSettings;
  }

  export interface RealitySettings {
    show: boolean;
    dest: string;
    xver: number;
    serverNames: string[];
    privateKey: string;
    shortIds: string[];
  }

  export interface Sniffing {
    enabled: boolean;
    destOverride: string[];
    routeOnly: boolean;
  }

  export interface GrpcSettings {
    serviceName: string;
  }

  export interface Outbound {
    protocol: string;
    tag: string;
  }
}
