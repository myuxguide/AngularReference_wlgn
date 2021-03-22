/**
 * OAuth token contractual interface
 */
export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in?: number;
  expires_at?: number;
  scope: string;
}
