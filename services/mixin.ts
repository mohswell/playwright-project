/**
 * Mixin function to combine multiple base classes into one
 * This function copies all properties and methods from source classes to the target class
 *
 * @param derivedCtor - The target class that will receive the mixed-in functionality
 * @param constructors - Array of source classes to mix in
 */
export function applyMixins(derivedCtor: any, constructors: any[]): void {
    constructors.forEach((baseCtor) => {
        // Get all property names from the source class prototype
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            // Skip constructor to avoid conflicts
            if (name !== 'constructor') {
                // Copy the property descriptor (including getters, setters, methods)
                Object.defineProperty(
                    derivedCtor.prototype,
                    name,
                    Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                        Object.create(null)
                );
            }
        });
    });
}