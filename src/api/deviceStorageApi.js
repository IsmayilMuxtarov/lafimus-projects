import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const saveToStorage = async (key, value) => {
    await Storage.set({
        key: `${key}`,
        value: JSON.stringify(value)
    })
}

export const readFromStorage = async (key) => {
    let data = await Storage.get({key})
    return JSON.parse(data.value)
}

export const removeFromStorage = async (key) => {
    await Storage.remove({
        key: key
    })
}

export const clearAll = async () => {
        await Storage.clear();
}
// async removeItem() {
//     await Storage.remove({ key: 'name' });
// }
//
// async keys() {
//     const { keys } = await Storage.keys();
//     console.log('Got keys: ', keys);
// }
