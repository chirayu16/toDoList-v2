export interface Task {
    name: string;
    dueDate: Date | null;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
    priority: 'P0' | 'P1' | 'P2' | '';
}
