export interface CreateBugRespone {
    success: boolean;
    message: string;
    bugId: number;
    userId: number;
}

export interface GetBugsRespone {
    success: boolean;
    data: {
        id: number;
        name: string;
        assignTo: string[];
        description: string;
        priority: string;
        status: string;
        projectId: number;
        createdAt: string;
        updatedAt: string;
        users: {
            Bug_User: { bugId: string; userId: string; }
            username: string;
        }[];
    }[];
}

export interface GetBugRespone {
    success: boolean;
    data: {
        id: number;
        name: string;
        assignTo: string[];
        description: string;
        priority: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        projectId: number;
        users: {
            Bug_User: { bugId: string; userId: string; }
            username: string;
        }[];
    };
}

export interface DeleteBugRespone {
    success: boolean;
    message: string;
}

export interface UpdateBugRespone {
    success: boolean;
    message: string;
}

export interface Bug {
    id: number;
    name: string;
    assignTo: string[];
    description: string;
    priority: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    projectId: number;
    users: {
        Bug_User: { bugId: string; userId: string; }
        username: string;
    }[];
}
