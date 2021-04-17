import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";

interface SummaryInfo {
  simulationDuration: number;
  intersectionsAmount: number;
  streetsAmount: number;
  carsAmount: number;
  scorePerCar: number;
}

interface Street {
  start: number;
  end: number;
  name: string;
  length: number;
  weight?: number;
}

interface CarRoute {
  start: number;
  streets: string[];
}

interface Intersection {
  index: number;
  incomingStreets: number;
  schedules: TrafficSchedule[];
}

interface TrafficSchedule {
  street: string;
  duration: number;
}

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

  private readFile(path: string, encoding = "UTF-8"): Buffer {
    return readFileSync(path);
  }

  private calculate(content: Buffer): string {
    const lines: string[] = content.toString().split("\n");
    const {
      simulationDuration,
      intersectionsAmount,
      streetsAmount,
      carsAmount,
      scorePerCar,
    } = this.extractSummaryInfo(lines[0]);
    let streets: Street[] = this.extractStreetInfo(
      lines.slice(1, streetsAmount + 1)
    );
    const routes: CarRoute[] = this.extractCarRoutes(
      lines.slice(streetsAmount + 1, lines.length - 1)
    );

    // console.log('Streets: ', streets);
    // console.log('Routes: ', routes);
    streets = this.enrichStreets(streets, routes);
    // console.log('Enriched Streets: ', streets);

    const intercetions: Intersection[] = this.getIntersections(streets);

    return this.formatIntersections(intercetions);
  }

  private writeResultsToFile(results: any): void {
    if (!existsSync(this.pathToOutputDirectory)) {
      mkdirSync(this.pathToOutputDirectory);
    }

    writeFileSync(this.pathToOutput, results);
  }

  private extractSummaryInfo(line: string): SummaryInfo {
    const nums = line.split(" ");
    const simulationDuration = parseInt(nums[0]);
    const intersectionsAmount = parseInt(nums[1]);
    const streetsAmount = parseInt(nums[2]);
    const carsAmount = parseInt(nums[3]);
    const scorePerCar = parseInt(nums[4]);

    return {
      simulationDuration,
      intersectionsAmount,
      streetsAmount,
      carsAmount,
      scorePerCar,
    };
  }

  private extractStreetInfo(lines: string[]): Street[] {
    return lines.map((l) => {
      const values = l.split(" ");

      return {
        start: parseInt(values[0]),
        end: parseInt(values[1]),
        name: values[2],
        length: parseInt(values[3]),
      };
    });
  }

  private extractCarRoutes(lines: string[]): CarRoute[] {
    return lines.map((l) => {
      const values = l.split(" ");

      return {
        start: parseInt(values[0]),
        streets: values.splice(1, values.length),
      };
    });
  }

  private getIntersections(streets: Street[]): Intersection[] {
    const obj: { [key: number]: { street: string; weight: number }[] } = {};

    streets.forEach((s: Street) => {
      if (obj[s.end]) {
        obj[s.end].push({ street: s.name, weight: s.weight ? s.weight : 1 });
      } else {
        obj[s.end] = [{ street: s.name, weight: s.weight ? s.weight : 1 }];
      }
    });

    // 1 2 4

    const results: Intersection[] = Object.entries(obj).map(([key, value]) => ({
      index: parseInt(key),
      incomingStreets: (value as { street: string; weight: number }[]).length,
      schedules: (value as { street: string; weight: number }[]).map((v) => ({
        street: v.street,
        // duration: Math.ceil(
        //   v.weight / (value as { street: string; weight: number }[]).length
        // ),
        duration: v.weight * (value as { street: string; weight: number }[]).length
      })),
    }));

    // console.log('Intersections: ', results);

    return results;
  }

  private formatIntersections(intersections: Intersection[]): string {
    let result = `${intersections.length}\n`;

    intersections.forEach((i) => {
      result += `${i.index}\n`;
      result += `${i.incomingStreets}\n`;

      i.schedules.forEach((s) => {
        result += `${s.street} ${s.duration}\n`;
      });
    });

    return result;
  }

  private enrichStreets(streets: Street[], routes: CarRoute[]): Street[] {
    const weights: { [key: string]: number } = {};
    let lengths: number[] = [];

    routes.forEach((r) => {
      r.streets.forEach((s) => {
        if (weights[s]) {
          weights[s] = weights[s] + 1;
        } else {
          weights[s] = 1;
        }

        lengths.push(s.length);
      });
    });

    let averageLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;


    // console.log("Weights: ", weights);

    return streets.map((s) => {
      let weight = weights[s.name] <= averageLength ? weights[s.name] + 1 : weights[s.name] - 1;

      weight = weight <= 0 ? 1 : weight;

      return { ...s, weight: weight };
    });
  }
}

const tinyFile = "a.txt";
const smallFile = "b.txt";
const averageFile = "c.txt";
const bigFile = "d.txt";
const hugeFile = "e.txt";
const giantFile = "f.txt";

const solution = new Solution();

solution.run(tinyFile);
solution.run(smallFile);
solution.run(averageFile);
solution.run(bigFile);
solution.run(hugeFile);
solution.run(giantFile);
