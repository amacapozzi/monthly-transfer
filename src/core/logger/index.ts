export class AppLogger {
  static error(err: Error) {
    console.error(`❌ [${err.name}] - ${err.message}`);
  }

  static info(msg: string) {
    console.log(`ℹ️ ${msg}`);
  }
}
