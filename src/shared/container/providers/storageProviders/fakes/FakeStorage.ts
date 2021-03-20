import IStorageProvider from '../models/IStorageprovider';

export default class FakeStorage implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );
    this.storage.splice(fileIndex, 1);
  }
}
