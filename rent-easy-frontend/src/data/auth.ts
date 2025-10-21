import { SAMPLE_USERS } from './properties';

// Static passwords for different roles
const STATIC_PASSWORDS = {
  admin: "Admin@123",
  owner: "Owner@123",
  tenant: "Tenant@123",
  guest: "Guest@123"
};

export const mockLogin = (email: string, password: string) => {
  let user;
  let correctPassword;

  // Determine user type from email
  if (email === SAMPLE_USERS.admin.email) {
    user = SAMPLE_USERS.admin;
    correctPassword = STATIC_PASSWORDS.admin;
  } else if (email === SAMPLE_USERS.owner.email) {
    user = SAMPLE_USERS.owner;
    correctPassword = STATIC_PASSWORDS.owner;
  } else if (email === SAMPLE_USERS.tenant.email) {
    user = SAMPLE_USERS.tenant;
    correctPassword = STATIC_PASSWORDS.tenant;
  } else if (email === SAMPLE_USERS.guest.email) {
    user = SAMPLE_USERS.guest;
    correctPassword = STATIC_PASSWORDS.guest;
  }

  if (user && password === correctPassword) {
    return {
      statusCode: 200,
      status: "OK",
      message: "User login successfully.",
      data: {
        token: {
          accessToken: `mock-${user.role}-access-token`,
          refreshToken: `mock-${user.role}-refresh-token`
        },
        user: {
          ...user,
          lastLogin: new Date().toISOString()
        }
      }
    };
  }

  // Return error for invalid credentials
  throw {
    statusCode: 401,
    status: "ERROR",
    message: "Invalid email or password",
    data: null
  };
};

export const mockRegister = (userData: any) => {
  return {
    statusCode: 201,
    status: "OK",
    message: "User created successfully.",
    data: {
      token: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token"
      },
      user: {
        ...userData,
        id: "mock-user-id-" + Date.now(),
        isProfileVerified: false,
        kycVerified: false,
        createdAt: new Date().toISOString()
      }
    }
  };
};

export const mockResetPassword = (email: string) => {
  return {
    statusCode: 200,
    status: "OK",
    message: "Reset password successfully",
    data: {
      message: "Reset link sent"
    }
  };
};

export const mockVerifyResetToken = (token: string) => {
  return {
    statusCode: 200,
    status: "OK",
    message: "Reset token verified successfully",
    data: {
      valid: true,
      message: "Token is valid"
    }
  };
};