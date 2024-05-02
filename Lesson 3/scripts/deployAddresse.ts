import { toNano } from '@ton/core';
import { Addresse } from '../wrappers/Addresse';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const addresse = provider.open(await Addresse.fromInit());

    await addresse.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(addresse.address);

    // run methods on `addresse`
}
