import { DataTypes, Model } from 'https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts';


export class Block extends Model {
  static table = 'deno-blocks';
  static timestamps = true;

  static fields = {
    height: { primaryKey: true, type: DataTypes.INTEGER },
    numTransactions: DataTypes.INTEGER,
  };
}