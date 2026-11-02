/**
 * Affiliate query parameter per store, appended to every buy link for that store.
 * Empty until Lucas joins each program, e.g. amazon: 'tag=stradascholar-20'.
 */
export const affiliateIds: Record<string, string> = {};

/** Display names for store keys used in car.yaml links. */
export const storeNames: Record<string, string> = {
  amazon: 'Amazon',
  fcpeuro: 'FCP Euro',
  ecs: 'ECS Tuning',
  turner: 'Turner Motorsport',
  maker: 'Manufacturer',
};
