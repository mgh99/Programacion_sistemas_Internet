export const authenticate = (req: any, res:any) => {
        const forbiden = ["test","pepi", "juan"]; //si incluye alguna de stas no se cumple
        if(forbiden.some(q => req.body.query.includes(q))) {
            return res.sendStatus(403);
        }

}