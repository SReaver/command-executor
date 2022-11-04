import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExacutor } from "../../core/executor/command.executor.js";
import { FileService } from "../../core/files/file.service.js";
import { StreamHandler } from "../../core/handlers/stream.handler.js";
import { IStreamLogger } from "../../core/handlers/streamllogger.interface.js";
import { PromptService } from "../../core/prompt/promtp.service.js";
import { FfmpegBuilder } from "./ffmpeg.builder.js";
import { ICommandExacFfmpeg, IFfmpegInput } from "./ffmpeg.types.js";

export class FfmpegExecutor extends CommandExacutor<IFfmpegInput> {
  constructor(logger: IStreamLogger) {
    super(logger);
  }

  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>("Ширина", "number");
    const height = await this.promptService.input<number>("Высота", "number");
    const path = await this.promptService.input<string>(
      "Путь до файла",
      "input"
    );
    const name = await this.promptService.input<string>("Имя файла", "input");
    return { width, height, path, name };
  }

  protected build({
    width,
    height,
    path,
    name,
  }: IFfmpegInput): ICommandExacFfmpeg {
    const output = this.fileService.getFilePath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(width, height)
      .output(output);
    return { command: "ffmpeg", args, output };
  }

  protected spawn({
    output,
    args,
    command,
  }: ICommandExacFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }

  protected processStrem(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
