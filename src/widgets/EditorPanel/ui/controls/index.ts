import { controlRegistry } from '../../model/controlRegistry';

import TextInput from './TextInput.vue';
import TextareaInput from './TextareaInput.vue';
import NumberInput from './NumberInput.vue';
import ColorInput from './ColorInput.vue';
import LinkArrayEditor from './LinkArrayEditor.vue';
import CodeEditorInput from './CodeEditorInput.vue';
import ImageInput from './ImageInput.vue';
import ObjectArrayEditor from './ObjectArrayEditor.vue';
import SelectInput from './SelectInput.vue';

controlRegistry.register({ type: 'text', component: TextInput });
controlRegistry.register({ type: 'textarea', component: TextareaInput });
controlRegistry.register({ type: 'number', component: NumberInput });
controlRegistry.register({ type: 'color', component: ColorInput });
controlRegistry.register({ type: 'link-array', component: LinkArrayEditor });
controlRegistry.register({ type: 'code-editor', component: CodeEditorInput });
controlRegistry.register({ type: 'image', component: ImageInput });
controlRegistry.register({ type: 'object-array', component: ObjectArrayEditor });
controlRegistry.register({ type: 'select', component: SelectInput });