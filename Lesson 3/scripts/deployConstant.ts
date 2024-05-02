import { toNano } from '@ton/core';
import { Constant } from '../wrappers/Constant';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const constant = provider.open(await Constant.fromInit());

    await constant.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(constant.address);

    // run methods on `constant`
}
