import { controlRegistry } from '../../model/controlRegistry';

import CodeEditorInput from './CodeEditorInput.vue';
import ColorInput from './ColorInput.vue';
import ImageInput from './ImageInput.vue';
import LinkArrayEditor from './LinkArrayEditor.vue';
import NumberInput from './NumberInput.vue';
import ObjectArrayEditor from './ObjectArrayEditor.vue';
import SelectInput from './SelectInput.vue';
import TextareaInput from './TextareaInput.vue';
import TextInput from './TextInput.vue';

controlRegistry.register({ type: 'text', component: TextInput });
controlRegistry.register({ type: 'textarea', component: TextareaInput });
controlRegistry.register({ type: 'number', component: NumberInput });
controlRegistry.register({ type: 'color', component: ColorInput });
controlRegistry.register({ type: 'link-array', component: LinkArrayEditor });
controlRegistry.register({ type: 'code-editor', component: CodeEditorInput });
controlRegistry.register({ type: 'image', component: ImageInput });
controlRegistry.register({ type: 'object-array', component: ObjectArrayEditor });
controlRegistry.register({ type: 'select', component: SelectInput });