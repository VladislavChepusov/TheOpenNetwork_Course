import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Bool } from '../wrappers/Bool';
import '@ton/test-utils';

describe('Bool', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let bool: SandboxContract<Bool>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        bool = blockchain.openContract(await Bool.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await bool.send(
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
            to: bool.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and bool are ready to use
    });
});
