import { MysqlError } from '../../dtos/mysql.error.dto';

export class MySQLException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MySQLException';
  }

  public static getMySQLError(error: string): MysqlError {
    const errorArray = error.split(' ');
    const from = 'QueryError(Server(MysqlError';
    const to = 'state:';
    const fromIndex = errorArray.indexOf(from);
    const toIndex = errorArray.indexOf(to);
    let mysqlErrorMessage = errorArray.slice(fromIndex + 1, toIndex + 2).join(' ') + ' }';
    const toReplace = ['code', 'message', 'state'];
    toReplace.forEach(element => {
      mysqlErrorMessage = mysqlErrorMessage.replace(element, `"${element}"`);
    });
    return JSON.parse(mysqlErrorMessage);
  }
}
