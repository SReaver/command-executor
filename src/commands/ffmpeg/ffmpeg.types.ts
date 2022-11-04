import { ICommandExec } from "../../core/executor/command.types.js";

export interface IFfmpegInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface ICommandExacFfmpeg extends ICommandExec {
  output: string;
}
