// Register
export interface RegisterRespone {
    success: boolean;
    message: string;
    user: number;
}

export interface RegisterUser {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRespone {
    success: boolean;
    message: string;
    user: {
        id: number;
        username: string;
        token: string;
        role: string;
    };
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface CheckAuth {
    authenticated: boolean;
    user: {
        sub: number;
        username: string;
        role: {
            id: number;
            name: string;
        },
        iat: number;
        exp: number;
    };
}



