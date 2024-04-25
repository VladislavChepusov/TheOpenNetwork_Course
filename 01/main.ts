import { getHttpEndpoint } from '@orbs-network/ton-access';
import * as dotenv from 'dotenv';
import { TonClient, WalletContractV4, fromNano, internal } from 'ton';
import { mnemonicToWalletKey } from 'ton-crypto';
 

// Мнемоник фразу в ключ генерим
  async function processMnemonicToKey(mnemonic: string[] | undefined){
    if (mnemonic) {
        const key = await mnemonicToWalletKey(mnemonic);
      return key;
    } else {
      throw new Error("Ошибка: Неверная строка авторизации кошелька");
    }
  }

  function sleep(ms: number){
    return new Promise (resolve => setTimeout(resolve, ms));
  }



// Определение асинхронной функции main
async function main() {

    dotenv.config();

    const mnemonic = (process.env.WALLET)?.split(" "); // Доступ к сохраненной строке из файла .env
    console.log(mnemonic); // Выведет "Это моя строка для файла конфигурации"
 
    const key = await processMnemonicToKey(mnemonic);

    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0})

    const endpoint = await getHttpEndpoint({network: "testnet"}); // Получения конечной точки на тестовой сети блокчейна

    const client = new TonClient({endpoint})
   
    if (! await client.isContractDeployed(wallet.address))
        return console.log("Кошелек не инициализирован");
    else
         console.log("Кошелек инициализирован");


    let  balance = await client.getBalance(wallet.address);
    console.log("Баланс кошелька = " + fromNano(balance) + " TON");


    // ПОЛУЧЕНИЕ NFT
    //EQChHpu8-rFBQyVCXJtT1aTwODTBc1dFUAEatbYy11ZLcBST

    const WalletContract = client.open(wallet)
    const seqno = await WalletContract.getSeqno()

    await WalletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages:[
            internal({
                to: "EQChHpu8-rFBQyVCXJtT1aTwODTBc1dFUAEatbYy11ZLcBST",
                value: "0.5",
                body: "Test TON",
                bounce:false

            })
        ]
    })


    let currentSegno = seqno
    while(currentSegno == seqno){
        console.log("Транзакция выполняется")
        await sleep(1500)
        currentSegno = await WalletContract.getSeqno()
    }
    
    
    console.log("Транзакция успешно завершена !")


    balance = await client.getBalance(wallet.address);
    console.log("Баланс кошелька = " + fromNano(balance) + " TON");
}


// Проверка, является ли скрипт главным модулем для выполнения
if (require.main === module) {
    main();
}
