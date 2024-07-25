export interface Event {
    event: string;
    data: Record<string, any>;
    metadata: Record<string, any>;
}