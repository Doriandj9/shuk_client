

export const formatNumberInteraction = (count: number): string => {
    if(count <=0 ) return '';

    const suffixes = ['k', 'M', 'B', 'T'];
    const numberOrigin = count;
    let suffixIndex = -1;
    
    while (count >= 1000 && suffixIndex < suffixes.length - 1) {
      count /= 1000;
      suffixIndex++;
    }
    const countValue = String(count);
    
    return numberOrigin > 999 ? countValue.substring(0,3) + suffixes[suffixIndex] : countValue;
};