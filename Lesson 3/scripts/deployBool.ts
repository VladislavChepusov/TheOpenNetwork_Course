import { toNano } from '@ton/core';
import { Bool } from '../wrappers/Bool';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const bool = provider.open(await Bool.fromInit());

    await bool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(bool.address);

    // run methods on `bool`
}
