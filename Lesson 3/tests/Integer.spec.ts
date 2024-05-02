import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Integer } from '../wrappers/Integer';
import '@ton/test-utils';

describe('Integer', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let integer: SandboxContract<Integer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        integer = blockchain.openContract(await Integer.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await integer.send(
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
            to: integer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and integer are ready to use
    });
});
