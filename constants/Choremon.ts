export type ChoremonType = "Tony" | "Skippy"

export interface Choremon {
    type: ChoremonType;
    images: NodeRequire[];
}

export const ChoremonData: Choremon[] = [{
    type: "Tony",
    images: [require('../assets/images/choremons/tonylevel1.png'), require('../assets/images/choremons/tonylevel2.png') ]
}, {
    type: "Skippy",
    images: [require('../assets/images/choremons/skippy.png'), require('../assets/images/choremons/skippy.png') ] 
}]