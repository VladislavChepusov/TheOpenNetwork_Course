import { toNano } from '@ton/core';
import { FirstContract } from '../wrappers/FirstContract';
import { NetworkProvider } from '@ton/blueprint';

// Скрипт возвращающий текущее состояние контракта. Его счетчик и id
export async function run(provider: NetworkProvider) {
    const firstContract = provider.open(await FirstContract.fromInit(1515n));

    const counter = await firstContract.getCounter();
    const id = await firstContract.getId();
    console.log(`Счетчик = ${counter}  id контракта - ${id} `);

}
