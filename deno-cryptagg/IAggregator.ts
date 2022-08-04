export class IBlock {
  height: number
  transactions: Array<ITransaction> = []
}

export class ITransaction {
  txHash: string
  height: number
} 

export interface IAggregator {
  getBlocks(startHeight: number, endHeight: number): Promise<Array<IBlock>>
}