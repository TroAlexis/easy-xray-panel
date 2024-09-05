export interface XrayUser {
  name: string;
  // User is suspended if they are not in the server config but client configs are kept
  suspended?: boolean;
}
