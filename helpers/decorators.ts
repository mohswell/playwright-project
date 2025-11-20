import { test } from "../fixtures";
/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
  return function <
    T extends (...args: any[]) => any, // original method signature
    A extends any[], // arguments type
    R // return type
  >(
    target: (this: any, ...args: A) => R,
    context: ClassMethodDecoratorContext
  ): (this: any, ...args: A) => Promise<R> {
    return async function (this: any, ...args: A): Promise<R> {
      const name = `${stepName || String(context.name)} (${
        this?.constructor?.name ?? "Unknown"
      })`;
      return await test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
