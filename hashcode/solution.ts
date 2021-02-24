import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";

class Solution {
  private pathToInput: string = "";
  private pathToOutputDirectory = `${__dirname}\\..\\output`;
  private pathToOutput: string = "";

  public run(filename: string): void {
    this.pathToInput = `${__dirname}\\..\\input\\${filename}`;
    this.pathToOutput = `${this.pathToOutputDirectory}\\${filename}`;

    const content = this.readFile(this.pathToInput);
    const results = this.calculate(content);

    this.writeResultsToFile(results);
  }

  private readFile(path: string, encoding?: string): Buffer {
    return readFileSync(path);
  }

  private calculate(content: any): void {}

  private writeResultsToFile(results: any): void {
    if (!existsSync(this.pathToOutputDirectory)) {
        mkdirSync(this.pathToOutputDirectory);
    }

    writeFileSync(this.pathToOutput, results);
  }
}

const tinyFile = "a_example.txt";
const smallFile = "b_lovely_landscapes.txt";
const averageFile = "c_memorable_moments.txt";
const bigFile = "d_pet_pictures.txt";
const hugeFile = "e_shiny_selfies.txt";

const solution = new Solution();

solution.run(tinyFile);
solution.run(smallFile);
solution.run(averageFile);
solution.run(bigFile);
solution.run(hugeFile);
