import { toNano } from '@ton/core';
import { Integer } from '../wrappers/Integer';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const integer = provider.open(await Integer.fromInit());

    await integer.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(integer.address);

    // run methods on `integer`
}
