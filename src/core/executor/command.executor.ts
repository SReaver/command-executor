import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/streamllogger.interface.js";

export abstract class CommandExacutor<Input> {
  constructor(private logger: IStreamLogger) {}
  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStrem(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): any;
  protected abstract spawn(command: any): ChildProcessWithoutNullStreams;
  protected abstract processStrem(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}
