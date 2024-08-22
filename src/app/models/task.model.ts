export interface Task {
    name: string;
    dueDate: Date;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
    priority: 'P0' | 'P1' | 'P2';
}
//comment to set pr reviewerr   