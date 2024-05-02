import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Addresse } from '../wrappers/Addresse';
import '@ton/test-utils';

describe('Addresse', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let addresse: SandboxContract<Addresse>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        addresse = blockchain.openContract(await Addresse.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await addresse.send(
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
            to: addresse.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and addresse are ready to use
    });
});
