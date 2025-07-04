import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

export interface RenderedComponent {
    // Уникальный ID экземпляра компонента на холсте
    instanceId: number;
    // Информация о компоненте из библиотеки
    componentInfo: UiComponentInfo;
}