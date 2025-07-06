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

Диаграммы последовательности иллюстрируют, как различные части приложения взаимодействуют друг с другом для выполнения ключевых пользовательских сценариев.

### 1. Загрузка Проекта

```mermaid
sequenceDiagram
    participant UI as BuilderPage.vue
    participant Logic as useProjectLoader.ts
    participant Data_P as projectStore.ts
    participant Data_C as canvasStore.ts
    participant Router as vue-router

    UI->>Logic: activate(projectId)
    Logic->>Data_P: findProject(projectId)
    Data_P-->>Logic: return project data

    alt Project Found & Valid
        Logic->>Data_C: setState(project.canvasState)
        Logic->>Logic: Установить watch для автосохранения
    else Project Not Found or Invalid
        Logic->>Router: push({ name: 'Dashboard' })
        Logic->>Data_C: resetState()
    end
    
    loop Auto-save on change
        Data_C-->>Logic: canvasStore state changed
        Logic->>Data_P: updateProjectCanvas(state)
    end
```

-   **`BuilderPage.vue`** (UI) при монтировании активирует **`useProjectLoader.ts`** (Logic), передавая ID проекта.
-   **`useProjectLoader.ts`** запрашивает "сырые" данные проекта из **`projectStore.ts`** (Data).
-   Если проект найден и его данные валидны, **`useProjectLoader.ts`** инициализирует **`canvasStore.ts`** (Data) состоянием проекта.
-   В противном случае пользователь перенаправляется на главную страницу через **`vue-router`**, а состояние холста сбрасывается вызовом `resetState` в `canvasStore`.
-   **`useProjectLoader.ts`** устанавливает `watch` для отслеживания изменений в **`canvasStore.ts`** и асинхронного сохранения этих изменений обратно в **`projectStore.ts`**.

### 2. Добавление Компонента на Холст

```mermaid
sequenceDiagram
    actor User
    participant UI as Canvas.vue
    participant Logic as useCanvasManager.ts
    participant Data as canvasStore.ts
    
    User->>UI: Drag & Drop компонента
    UI->>Logic: addComponent(componentId)
    
    Logic->>Logic: Создать новый экземпляр (props, styles)
    Logic->>Data: _addInstance(newInstance)
    Data-->>UI: (Reactivity) Обновить DOM
```

-   Пользователь перетаскивает компонент из библиотеки на **`Canvas.vue`** (UI).
-   **`Canvas.vue`** обрабатывает событие `drop` и вызывает метод `addComponent` из фасада **`useCanvasManager.ts`** (Logic).
-   **`useCanvasManager.ts`** создает новый объект-экземпляр компонента с настройками по умолчанию.
-   Фасад вызывает `action` у **`canvasStore.ts`** (Data), чтобы добавить новый экземпляр в массив.
-   Система реактивности Vue обновляет DOM, и пользователь видит новый компонент на холсте.

### 3. Редактирование Компонента

```mermaid
sequenceDiagram
    actor User
    participant UI_Editor as EditorPanel.vue
    participant Logic as useCanvasManager.ts
    participant Data as canvasStore.ts
    participant UI_Canvas as Canvas.vue

    User->>UI_Canvas: Клик по компоненту
    UI_Canvas->>Logic: selectComponent(instanceId)
    Logic->>Data: selectComponent(instanceId)
    note over UI_Editor: EditorPanel отображает свойства<br/>выбранного компонента

    User->>UI_Editor: Изменяет значение в поле
    UI_Editor->>Logic: updateComponentProps({ newValues })
    Logic->>Data: updateComponentProps(payload)
    Data-->>UI_Canvas: (Reactivity) Обновить DOM
```

-   Пользователь кликает на компонент в **`Canvas.vue`**, который вызывает `selectComponent` у **`useCanvasManager.ts`** (Logic).
-   **`EditorPanel.vue`** (UI) реактивно отображает элементы управления для выбранного компонента.
-   При изменении значения в поле (`EditorControl`), **`EditorPanel.vue`** вызывает соответствующий метод (`updateComponentProps` или `updateComponentStyles`) у **`useCanvasManager.ts`**.
-   Фасад делегирует обновление в **`canvasStore.ts`** (Data).
-   Реактивность обновляет вид компонента на холсте.

### 4. Экспорт в HTML

```mermaid
sequenceDiagram
    actor User
    participant UI as TheHeader.vue
    participant Logic as ExportManager
    participant State as useCanvasState.ts
    participant Shared as downloadFile.ts
    participant Browser
    
    User->>UI: Клик по кнопке "Экспорт"
    UI->>Logic: exportPageAsHtml()
    
    Logic->>State: Получить renderedComponents
    State-->>Logic: Вернуть актуальные данные холста
    
    Logic->>Logic: 1. Сгенерировать CSS
    Logic->>Logic: 2. Срендерить компоненты в HTML
    Logic->>Logic: 3. Сгенерировать JS для скриптов
    Logic->>Logic: 4. Собрать финальный HTML-документ
    
    Logic->>Shared: downloadFile(htmlContent)
    Shared->>Browser: Создать ссылку и инициировать скачивание
    Browser-->>User: Диалог сохранения файла
```

-   Пользователь нажимает кнопку экспорта в **`TheHeader.vue`** (UI).
-   Вызывается функция `exportPageAsHtml` из модуля **`ExportManager`** (Logic).
-   **`ExportManager`** запрашивает актуальное состояние холста через `useCanvasState`.
-   Модуль последовательно генерирует CSS, рендерит Vue-компоненты в статическую HTML-строку (`@vue/server-renderer`), генерирует JS для интерактивности.
-   Собранный HTML-код передается в утилиту **`downloadFile`** (Shared), которая инициирует скачивание файла в браузере.