class IO {
  #in
  #out
  #timer
  constructor(inputStream, outputStream, timer) {
    this.#in = inputStream;
    this.#out = outputStream;
    this.#timer = timer;
  }

  watchInputLine(onNewLine) {
    this.#in.setEncoding('utf8');

    const collectInput = () => {
      const chunk = this.#in.read();
      if (!chunk) {
        if (this.#in._readableState.ended)
          this.#timer.clearInterval(readTimer);
        return;
      }
      let content = chunk.trim();
      const lines = content.split('\n');
      lines.forEach((line) => onNewLine(line));
    }
    const readTimer = this.#timer.setInterval(collectInput, 500);
  }

  writeLine(line) {
    this.#out.write(line + '\n');
  }
}

exports.IO = IO;
