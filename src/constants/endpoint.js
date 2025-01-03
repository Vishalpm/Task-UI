export const endpoints = {
    // Task
    createTask: () => "/task/createnew",
    showAllTasks: () => "/task/showall",
    taskWithId: (taskId) => `/task/${taskId}`,
    pendingTasks: () => "/task/pending",
    updateTask: (taskId) => `/task/${taskId}`,
    deleteTask: (taskId) => `/task/${taskId}`,

    // Project
    createProject: () => "/project/create-project",
    createProjectTask: () => "/project/create-project-task",
    showAssignedProject: () => "/project/show-assigned-project",
    projectWithId: (projectId) => `/project/${projectId}`,
    addProjectToUser: () => "/project/add-user-to-project",
    showAllUser: ()=> "/project/show-users",

    // User
    registerUrl: () => "/register",
    resetPassword: (token) => `/reset-password/${token}`,
    showAllUsers: () => "/project/show-users",
    showProfile: () => "/profile",
    searchUser: () => "/searchUsers",
    loginUrl: () => "/login",
    forgetPassword: () => "/forget-password",
};
