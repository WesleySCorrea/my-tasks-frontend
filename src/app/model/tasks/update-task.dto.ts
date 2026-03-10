export interface UpdateTaskDTO {
    description: string;
    priority: 'BAIXA' | 'MEDIA' | 'ALTA';
    deadline: string;
}