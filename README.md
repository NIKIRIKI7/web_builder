# Архитектура Приложения "Web Builder"

Этот документ описывает высокоуровневую архитектуру веб-конструктора, иллюстрируя ключевые компоненты, их взаимодействие и потоки данных в приложении.

## UML Диаграмма (Mermaid)

```mermaid
graph TD
    subgraph "Pages & UI Layer"
        DashboardPage[DashboardPage.vue]
        BuilderPage[BuilderPage.vue]
        TheHeader[TheHeader.vue]
        ProjectList[ProjectList.vue]
        UiLibrary[UiLibrary.vue]
        Workspace[Workspace.vue]
        EditorPanel[EditorPanel.vue]
        ModalManager[ModalManager.vue]
        ProjectCard[ProjectCard.vue]
        CreateProjectCard[CreateProjectCard.vue]
        EditorControls["EditorControl.vue <br/>(TextInput, etc.)"]

        DashboardPage --> TheHeader & ProjectList
        BuilderPage --> TheHeader & Workspace & UiLibrary & EditorPanel
        ProjectList --> ProjectCard & CreateProjectCard
        Workspace --> Canvas[Canvas.vue]
        EditorPanel --> EditorControls
    end

    subgraph "Features Layer (Business Logic)"
        ProjectFacade[("useProjectLoader.ts<br/>useModalStore.ts")]
        CanvasFacade[("useCanvasManager.ts")]
        LayoutFacade[("layoutStore.ts")]
        PreviewFacade[("previewStore.ts")]
        LibraryFeature[("FilterableUiLibraryStore.ts")]
        ExportFeature[("features/ExportManager")]
    end

    subgraph "Entities & Data Layer (Pinia)"
        ProjectStore[("projectStore.ts <br/> Projects State")]
        CanvasStore[("canvasStore.ts <br/> Canvas State")]
        Persist[("localStorage")]
        ProjectEntity[("Project Entity")]
        UiComponentEntity[("UiComponent Entity")]
    end

    subgraph "Shared Resources"
        SharedRouter[("Router")]
        SharedI18n[("i18n")]
        SharedTheme[("ThemeManager")]
        SharedLayout[Layout Components]
        SharedIcons[UI: /icons/*.vue]
        SharedHooks["Shared Hooks <br/>(useClickOutside)"]
        SharedUtils["Shared Utils <br/>(debounce, klona)"]
    end

    %% Interactions
    DashboardPage -- "Uses" --> ProjectFacade
    BuilderPage -- "Uses" --> ProjectFacade
    ProjectList -- "Uses" --> ProjectStore
    ProjectCard -- "Uses" --> ProjectFacade
    CreateProjectCard -- "Uses" --> ProjectFacade

    TheHeader -- "Manages" --> LayoutFacade & PreviewFacade
    TheHeader -- "Exports via" --> ExportFeature

    UiLibrary -- "Uses" --> LibraryFeature
    Workspace -- "Manages preview via" --> PreviewFacade
    
    Canvas -- "Interacts with" --> CanvasFacade
    EditorPanel -- "Interacts with" --> CanvasFacade
    
    CanvasFacade -- "Orchestrates logic for" --> CanvasStore
    ProjectFacade -- "Manages project lifecycle for" --> CanvasStore & ProjectStore

    ProjectStore -- "Saves state to" --> Persist
    LayoutFacade -- "Saves state to" --> Persist

    %% Styling
    classDef page fill:#cde4ff,stroke:#5c98d9,stroke-width:2px;
    classDef widget fill:#e1effa,stroke:#a6c5e3,stroke-width:2px;
    classDef feature fill:#fce8d5,stroke:#e3b593,stroke-width:2px;
    classDef store fill:#d5fada,stroke:#93e3a4,stroke-width:2px;
    classDef shared fill:#e8d5f9,stroke:#b593e3,stroke-width:2px;

    class DashboardPage,BuilderPage page;
    class TheHeader,ProjectList,UiLibrary,Workspace,EditorPanel,ModalManager,ProjectCard,CreateProjectCard,EditorControls,Canvas widget;
    class ProjectFacade,CanvasFacade,LayoutFacade,PreviewFacade,LibraryFeature,ExportFeature feature;
    class ProjectStore,CanvasStore,Persist,ProjectEntity,UiComponentEntity store;
    class SharedRouter,SharedI18n,SharedTheme,SharedLayout,SharedIcons,SharedHooks,SharedUtils shared;
```

## Описание Архитектурных Слоев

### 1. Слой Представления (UI Layer)

Этот слой отвечает за всё, что видит и с чем взаимодействует пользователь. Компоненты этого слоя не содержат сложной бизнес-логики, а делегируют её обработку слою фичей.

-   **Страницы (`pages`)**:
    -   `DashboardPage.vue`: Главная страница для управления проектами. Отображает `ProjectList`.
    -   `BuilderPage.vue`: Основная страница-конструктор. Компонует основные виджеты (`TheHeader`, `UiLibrary`, `Workspace`, `EditorPanel`) и делегирует логику загрузки/сохранения хуку `useProjectLoader`.

-   **Виджеты (`widgets`)**:
    -   `TheHeader.vue`: Верхняя панель приложения. Управляет навигацией, темами, языком, режимом редактирования лэйаута и запуском экспорта.
    -   `ProjectList.vue`: Отображает список проектов (`ProjectCard`) и карточку создания нового проекта.
    -   `UiLibrary.vue`: Панель с библиотекой компонентов, использующая виртуализацию (`@tanstack/vue-virtual`) для высокой производительности.
    -   `Workspace.vue`: Центральная рабочая область, управляющая режимами предпросмотра (`desktop`, `tablet`, `mobile`). Содержит `Canvas`.
    -   `Canvas.vue`: Холст, куда пользователи перетаскивают компоненты. Взаимодействует с фасадом `useCanvasManager`.
    -   `EditorPanel.vue`: Панель свойств выбранного компонента.
    -   `ModalManager.vue`: Глобальный обработчик для отображения модальных окон, таких как `CreateProjectModal` и `ConfirmModal`.

### 2. Слой Фичей (Features Layer)

Это "мозговой центр" приложения, инкапсулирующий бизнес-логику и изолирующий UI от прямого манипулирования данными. Реализован через Vue Composables (фасады) и Pinia-сторы с логикой.

-   **`ProjectFacade`**: Объединяет хуки `useProjectLoader` для управления жизненным циклом проекта (загрузка, автосохранение) и `useModalStore` для управления модальными окнами (создание, удаление).
-   **`CanvasFacade (useCanvasManager.ts)`**: Фасад для работы с холстом. Предоставляет для UI-слоя простой API (`addComponent`, `updateComponentProps`), инкапсулируя сложную логику взаимодействия с `canvasStore`.
-   **`LayoutFacade (layoutStore.ts)`**: Управляет состоянием и логикой кастомизируемого интерфейса (положение и размеры панелей).
-   **`PreviewFacade (previewStore.ts)`**: Управляет режимом предпросмотра холста (десктоп, планшет, мобильный).
-   **`LibraryFeature (FilterableUiLibraryStore.ts)`**: Содержит логику для поиска и фильтрации в библиотеке компонентов с использованием `fuse.js`.
-   **`ExportFeature`**: Изолированный модуль, отвечающий исключительно за экспорт проекта в HTML, CSS и JS.

### 3. Слой Сущностей и Данных (Entities & Data Layer)

Этот слой отвечает за хранение "сырого" состояния (raw state) и определение структуры данных.

-   **`ProjectStore.ts`**: Pinia-стор, хранит массив всех проектов. Использует `pinia-plugin-persistedstate` для сохранения в `localStorage` и систему миграций для обновления структуры.
-   **`CanvasStore.ts`**: "Глупый" Pinia-стор, хранит только состояние холста: массив экземпляров компонентов, их `props`, `styles`, `scripts` и ID выбранного элемента.
-   **`Project (Entity)`**: Типизация, описывающая структуру проекта.
-   **`UiComponent (Entity)`**: Ключевая бизнес-сущность. Описывает метаданные компонента, его Vue-реализацию, стили по умолчанию и конфигурацию для редактора.
-   **UI-сущности**: `ProjectCard.vue`, `CreateProjectCard.vue` - компоненты, представляющие одну сущность в UI.

### 4. Общие Ресурсы (Shared Layer)

Переиспользуемые модули и утилиты, доступные во всём приложении.

-   **`SharedRouter`**: Конфигурация `vue-router` для навигации между страницами.
-   **`SharedI18n`**: Настройка `vue-i18n` для интернационализации.
-   **`SharedTheme`**: `useThemeManager` для управления темами (светлая/тёмная).
-   **`SharedLayout`**: Компоненты для построения кастомизируемого интерфейса (`LayoutManager`, `LayoutPanel`, `Splitter`).
-   **`SharedHooks`**: Переиспользуемые Vue Composables (`useClickOutside`).
-   **`SharedUtils`**: Набор простых утилит (`debounce`, `klona`, `downloadFile`).
-   **`SharedIcons`**: Централизованная библиотека иконок в виде Vue-компонентов.

## Потоки Данных (Data Flow)

1.  **Создание Проекта**:
    -   Пользователь нажимает "Создать" в `CreateProjectCard` (UI).
    -   Вызывается `useModalStore` (Feature), который открывает `CreateProjectModal` через `ModalManager` (UI).
    -   После подтверждения `useModalStore` возвращает `Promise` с данными.
    -   `ProjectList` (UI) вызывает экшен `createProject` у `projectStore` (Data).
    -   `vue-router` (Shared) перенаправляет на страницу `BuilderPage`.

2.  **Загрузка Проекта**:
    -   `BuilderPage.vue` (UI) монтируется и активирует `useProjectLoader` (Feature), передавая ID проекта.
    -   `useProjectLoader` запрашивает данные у `projectStore` (Data) и валидирует их.
    -   `useProjectLoader` вызывает экшен `setState` у `canvasStore` (Data), заполняя холст.
    -   `useProjectLoader` устанавливает `watch` для автосохранения изменений из `canvasStore` обратно в `projectStore`.

3.  **Добавление компонента на холст**:
    -   Пользователь перетаскивает `UiLibraryItem` (UI).
    -   `Canvas.vue` (UI) ловит событие `drop` и вызывает `addComponent` у `useCanvasManager` (Feature).
    -   `useCanvasManager` создает экземпляр компонента и вызывает экшен `_addInstance` у `canvasStore` (Data).
    -   `canvasStore` обновляет свой массив, что реактивно отображается на холсте.

4.  **Экспорт в HTML**:
    -   Пользователь нажимает кнопку в `TheHeader.vue` (UI).
    -   Вызывается функция из модуля `ExportManager` (Feature).
    -   `ExportManager` запрашивает актуальные данные у `useCanvasState` (Feature), генерирует HTML, CSS, JS и инициирует скачивание файла. Логика сторов и холста не затрагивается.