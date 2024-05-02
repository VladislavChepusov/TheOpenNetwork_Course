import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Constant } from '../wrappers/Constant';
import '@ton/test-utils';

describe('Constant', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let constant: SandboxContract<Constant>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        constant = blockchain.openContract(await Constant.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await constant.send(
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
            to: constant.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and constant are ready to use
    });
});
