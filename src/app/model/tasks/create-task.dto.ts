export interface CreateTaskDTO {
    title: string;
    description: string;
    priority: 'BAIXA' | 'MEDIA' | 'ALTA';
    deadline: string;
}