import jwt from 'jsonwebtoken'
import DotEnv from 'dotenv'
DotEnv.config()
// Auth guard for user pages
const authRequired = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
            if(err) {
                return res.sendStatus(403)
            } else {
                if(user != null) {
                    next() 
                } else {
                    return res.sendStatus(403)
                }
            } 
        })
    } else
        res.sendStatus(401)
};

// // Auth guard for admin pages
// const authAdminRequired = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1]
//         jwt.verify(token, a.secretToken, async (err, user) => {
//             if(err) {
//                 return res.sendStatus(403)
//             } else {
//                 if (user.role == 1) {
//                     const { rows } = await verifyUser(db, user.id)
//                     if (rows.length != 0 && rows[0].role == 1) {
//                         req.user = user
//                         next()
//                     }  else
//                         return res.sendStatus(403) 
//                 } else
//                     return res.sendStatus(403).send("No permission!")
//             }   
//         });
//     } else
//         res.sendStatus(401)
// };

// const verifyUser = (db, id) =>
  
//   db.query(queries.GetRole, [id])
export default authRequired;
// module.exports = { authRequired }