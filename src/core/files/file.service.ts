import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class FileService {
  async isExists(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }
  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(dirname + "" + path);
    }
    return join(dirname(path) + "/" + name + "." + ext);
  }
  async deleteFileIfExists(path: string): Promise<void> {
    if (await this.isExists(path)) {
      await promises.unlink(path);
    }
  }
}
