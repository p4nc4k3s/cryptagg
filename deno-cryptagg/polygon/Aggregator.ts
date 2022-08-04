import { IAggregator, ITransaction, IBlock } from "../IAggregator.ts";
import { postData } from "../utility/index.ts";

export class Aggregator implements IAggregator {
  private url: string = "https://polygon-rpc.com";

  async getBlocks(
    startHeight: number,
    endHeight: number
  ): Promise<Array<IBlock>> {
    console.log(`Getting blocks from height ${startHeight} to height ${endHeight-1}`)
    let blocks: Array<IBlock> = [];
    let promises: Array<Promise<any>> = [];
    for (var i = startHeight; i < endHeight; i++) {
      let blockRequest = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [`0x${i.toString(16)}`, true],
        id: 1,
      };

      promises.push(postData(this.url, blockRequest));
    }

    const results = await Promise.all(promises);
    for (const result of results) {
      const block = new IBlock();
      block.height = Number(result["result"]["number"]) || 0;

      const txns: Array<any> = result["result"]["transactions"] || [];

      for (const tx of txns) {
        const polyTrans = new ITransaction();
        polyTrans.height = startHeight;
        polyTrans.txHash = tx["hash"];
        block.transactions.push(polyTrans);
      }

      blocks.push(block);
    }

    return blocks;
  }
}
