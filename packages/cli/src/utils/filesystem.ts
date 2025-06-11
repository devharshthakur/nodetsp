/**
 * This module provides filesystem utilities .
 * The module includes functions for creating folders, creating files, and deleting files and folders.
 *
 * @module filesystem
 */

import fs from 'fs-extra';

/**
 * Creates a folder at the specified path
 * @param folderName - Name of the folder to create
 * @param folderPath - Path where the folder should be created
 */
export async function creatFolder(folderName: string, folderPath: string): Promise<void> {
  await fs.ensureDir(folderName);
}

/**
 * Creates a file with the specified content
 * @param filePath - Path where the file should be created
 * @param content - Content to write in the file
 */
export async function createFile(filePath: string, content: string): Promise<void> {
  await fs.outputFile(filePath, content);
}

/**
 * Deletes a file from the filesystem
 * @param filePath - Path of the file to delete
 */
export async function deleteFile(filePath: string): Promise<void> {
  await fs.remove(filePath);
}

/**
 * Deletes a folder and all its contents from the filesystem
 * @param folderPath - Path of the folder to delete
 */
export async function deleteFolder(folderPath: string): Promise<void> {
  await fs.remove(folderPath);
}

/**
 * Deletes multiple folders and their contents from the filesystem
 * @param folderPaths - Array of folder paths to delete
 */
export async function deleteMultipleFolders(folderPaths: string[]): Promise<void> {
  await Promise.all(folderPaths.map(path => fs.remove(path)));
}
