import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { FirstContract } from '../wrappers/FirstContract';
import '@ton/test-utils';

describe('FirstContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let firstContract: SandboxContract<FirstContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        firstContract = blockchain.openContract(await FirstContract.fromInit(1515n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await firstContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: firstContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and firstContract are ready to use
    });

    //рукописный тест на функцию счетчика
    it('should plus', async () => {
         const counterBefore = await firstContract.getCounter();

         console.log("counterBefore = "+ counterBefore);

         await firstContract.send(
            deployer.getSender(),
            {
                value: toNano("0.01")
            },
            "plus"
         )

         const counterAfter = await firstContract.getCounter();
         console.log("counterAfter = "+ counterAfter);

         expect(counterBefore).toBeLessThan(counterAfter); // Сравниваем значения счетчиков до и после транзакции
    });


    it('should amount', async () => {
        const counterBefore = await firstContract.getCounter();

        const amount = 115n;
        console.log("counterBefore = "+ counterBefore);

        await firstContract.send(
           deployer.getSender(),
           {
               value: toNano("0.01")
           },
           {
            $$type: "Add",
            amount: amount
           }
        )

        const counterAfter = await firstContract.getCounter();
        console.log("counterAfter = "+ counterAfter);

        expect(counterBefore).toBeLessThan(counterAfter); // Сравниваем значения счетчиков до и после транзакции
   });






    

});
