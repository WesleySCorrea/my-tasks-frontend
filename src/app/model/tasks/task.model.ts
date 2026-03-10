export interface TaskBasic {
    id: number;
    title: string;
    description: string;
    priority: 'BAIXA' | 'MEDIA' | 'ALTA';
    status: 'ABERTA' | 'CONCLUIDA' | 'ATRASADA';
    deadline: Date
}

export interface TaskInfo {
    id: number;
    title: string;
    description: string;
    priority: 'BAIXA' | 'MEDIA' | 'ALTA';
    status: 'ABERTA' | 'CONCLUIDA' | 'ATRASADA';
    deadline: string;
    createdAt: string;
    updatedAt: string;
    userName: string;
}