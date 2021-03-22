export class User {
    userId?: string;
    userName?: string;
    password?: string;
    deviceId?: string;
    sessionId?: string;
    twoFAEnabled?: boolean;
    trustDevice?: boolean;
    fclCookie?: string;
    contactNameCookie?: string;
    nameCookie?: string;
    uuidCookie?: string;
    verificationMethods?: any[];

    constructor(opts?: {
      userId?: string;
      userName?: string;
      password?: string;
      deviceId?: string;
      sessionId?: string,
      twoFAEnabled?: boolean,
      trustDevice?: boolean,
      fclCookie?: string,
      contactNameCookie?: string,
      nameCookie?: string,
      uuidCookie?: string,
      verificationMethods?: any[]
    }) {
      if (opts) {
        this.userId = opts.userId;
        this.userName = opts.userName;
        this.password = opts.password;
        this.deviceId = opts.deviceId;
        this.sessionId = opts.sessionId;
        this.twoFAEnabled = opts.twoFAEnabled;
        this.trustDevice = opts.trustDevice;
        this.fclCookie = opts.fclCookie;
        this.contactNameCookie = opts.contactNameCookie;
        this.nameCookie = opts.nameCookie;
        this.uuidCookie = opts.uuidCookie;
        this.verificationMethods = opts.verificationMethods;
      }
    }
  }
