import { toNano } from '@ton/core';
import { String } from '../wrappers/String';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const string = provider.open(await String.fromInit());

    await string.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(string.address);

    // run methods on `string`
}
