import { useDataCategoryStore } from '@/stores/dataCategory';
const appState = useDataCategoryStore();

const humanFileSize = (sizeInBytes : number, si : boolean = false, dp : number = 1) => {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(sizeInBytes) < thresh) {
        return sizeInBytes + ' B';
    }
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;
    do {
        sizeInBytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(sizeInBytes) * r) / r >= thresh && u < units.length - 1);
    return sizeInBytes.toFixed(dp) + ' ' + units[u];
};

const getDataEngineItem = (key:string) =>{
    let paramItem = appState.databaseEngineOptions.find((pItem:any) => pItem.key === key);
    if(paramItem) return paramItem;
    return { name: "Không xác định" };
}

export { humanFileSize , getDataEngineItem };