 
export function debounce<T extends (..._args: unknown[]) => void>(
    func: T,
    waitFor: number,
     
): (..._args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}