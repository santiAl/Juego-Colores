export type Color = {
    name : string,
    color: string,
    correct: boolean 
}

export const Api = () => {
    return new Promise<Color[]>((resolve, reject) => {
        const colors = [{
            name: "rojo", 
            color: "#FF0000",
            correct: false
        },{
            name: "azul",
            color: "#0000FF",
            correct: false
        },{
            name: "verde",
            color: "#008000",
            correct: false
        },{
            name: "amarillo",
            color: "#FFFF00",
            correct: false
        }];
        
        resolve(colors);
    });
};


