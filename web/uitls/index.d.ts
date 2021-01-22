export interface NotifyOptions {
    type: 'success' | 'warning' | 'info' | 'error';
    title: string;
    message: string;
}

export { CreateNotify } from './notify'