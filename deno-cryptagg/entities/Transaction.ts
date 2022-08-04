import { DataTypes, Model, Relationships } from 'https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts';


export class Transaction extends Model {
  static table = 'deno-transactions';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    txHash: DataTypes.STRING,
    height: DataTypes.INTEGER
  };
}

