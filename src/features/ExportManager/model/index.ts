import type { ExportStrategy, ExportableComponent } from './types';

export async function exportPage(
  components: ExportableComponent[],
  strategy: ExportStrategy
): Promise<void> {
  await strategy.export(components);
}