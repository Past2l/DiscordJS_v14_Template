import dayjs from 'dayjs';

export class Log {
  static info(content: string, timestamp?: boolean) {
    console.log(
      `\u001B[31m[\u001B[32mINFO\u001B[31m]\u001B[0m ${
        timestamp
          ? `\u001B[33m(${dayjs().format('YYYY/MM/DD HH:mm:ss')})\u001B[0m `
          : ''
      }${content}`,
    );
  }

  static debug(content: string, timestamp?: boolean) {
    if (process.env.NODE_ENV == 'development')
      console.log(
        `\u001B[31m[\u001B[32mDEBUG\u001B[31m]\u001B[0m ${
          timestamp
            ? `\u001B[33m(${dayjs().format('YYYY/MM/DD HH:mm:ss')})\u001B[0m `
            : ''
        }${content}`,
      );
  }

  static error(content: string, timestamp?: boolean) {
    console.log(
      `\u001B[31m[\u001B[32mERROR\u001B[31m]\u001B[0m ${
        timestamp
          ? `\u001B[33m(${dayjs().format('YYYY/MM/DD HH:mm:ss')})\u001B[0m `
          : ''
      }\u001B[31m${content}\u001B[0m`,
    );
  }
}
