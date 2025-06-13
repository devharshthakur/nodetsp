export interface Injector {
  inject(installDeps?: boolean): Promise<void>;
}
