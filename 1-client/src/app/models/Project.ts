export interface CreateProjectRespone {
    data: {
        id: number;
        username: string;
        createdAt: string;
    };
    message: string;
    success: boolean;
}

export interface ProjectsRespone {
    data: {
        id: number;
        name: string;
        category: string;
        description: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        Project_User: { userId: number; projectId: number; };
    }[];
    success: boolean;
}

export interface ProjectRespone {
    data: {
        hasUser: boolean;
        project: {
            id: number;
            name: string;
            category: string;
            description: string;
            status: string;
            createdAt: string;
            updatedAt: string;
            users: {
                username: string;
                Project_User: { userId: number; projectId: number; };
            }[];
        };
    };
    success: boolean;
}

export interface UpdateProjectRespone {
    success: boolean;
    message: string;
}

export interface DeleteProjectRespone {
    success: boolean;
    message: string;
}

export interface Project {
    id: number;
    name: string;
    category: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectWithUsers {
    id: number;
    name: string;
    category: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    users: string[];
}

export interface AddNewUserToProjectRespone {
    success: boolean;
    message: string;
    userId: number;
    projectId: number;
}
