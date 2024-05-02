import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { String } from '../wrappers/String';
import '@ton/test-utils';

describe('String', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let string: SandboxContract<String>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        string = blockchain.openContract(await String.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await string.send(
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
            to: string.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and string are ready to use
    });
});
