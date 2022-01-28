export default {
    name: "elrick",
    description: "el ricko",
    
    handler: () => {
        return `https://${(Math.random() + 1).toString(36).substring(7)}.elrick.fans`;
    }
}