export function stringCompareFn(a:string, b:string){
    const upperA = a.toUpperCase(); // ignore upper and lowercase
    const upperB = b.toUpperCase(); // ignore upper and lowercase
    if (upperA < upperB) return -1;
    if (upperA > upperB) return 1;
    return 0;
}