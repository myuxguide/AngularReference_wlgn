/**
 * Response interface
 */
export interface APIResponse {
  status?: string;
  output?: Output;
  transactionId?: string;
}

export interface Output {
  firstName?: string;
  lastName?: string;
  email?: string;
  emailSent?: boolean;
  transactionId?: string;
  customerTransactionId?: string;
  sessionId?: string;
  twoFAEnabled?: boolean;
  trustDevice?: boolean;
  fclCookie?: string;
  contactNameCookie?: string;
  nameCookie?: string;
  uuidCookie?: string;
  verificationMethods?: VerificationMethod[];
  maxLimit?: boolean;
  userLoggedIn?: boolean;
}

export interface VerificationMethod {
  deliveryMethod?: string;
  address?: string;
  primary?: boolean;
}
