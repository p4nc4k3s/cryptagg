import  { Aggregator } from './polygon/Aggregator.ts'
import { Block } from './entities/Block.ts'
import { Transaction } from './entities/Transaction.ts'
import db from './database/Database.ts'
import { IBlock } from './IAggregator.ts'

let startingHeight: number = 1
let chunks = 50
let totalBlocks = 1000

async function main() {
  const t0 = performance.now();

  db.sync({ drop: true})

  let agg = new Aggregator()
  let blocks: Array<IBlock> = []
  for (var i = startingHeight; i < (startingHeight * totalBlocks); i = i + chunks) {
    let res = await agg.getBlocks(i, i+chunks)  
    blocks.push(...res)
  }

  for await (const block of blocks) {
    console.log(`Saving block at height ${block.height}`)
    const sblock = new Block()
    sblock.height = block.height
    sblock.numTransactions = block.transactions.length || 0
    sblock.save()
    for await (const txn of block.transactions) {
      const stxn = new Transaction()
      stxn.txHash = txn.hash
      stxn.height = block.height
      stxn.save()
    }
  }

  db.close()
  const t1 = performance.now();
  console.log(`Getting ${totalBlocks} blocks took ${t1 - t0} milliseconds.`);
}

void main()