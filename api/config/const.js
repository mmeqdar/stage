const RESPONSES = {
  ERRORS: {
    GENERAL: 'An error occured. Please try Again later.',
    DATA_MISSING: 'One or more arguments are missing.',
    LOGINPHONE: "Wrong phone",
    LOGINPSWD: "Wrong password",
    VERIF: "Account is not verified",
    NAME: "Full name must have between 5 and 30 and only Alphabetic",
    PHONE:"Phone is not Valid",
    PSWD:"Password requires at least 1 lower 1 upper case letter and 1 digit and between 5 and 20",
    REGISTER_PHONE: "PHONE Already Exists",
    CODE: " Wrong CODE",
    REGION:"Wrong Region",
    QUANTITY_WRONG:"Quantity is wrong",
    PRIX_WRONG:"Price is wrong",
    DES_WRONG:"Description must contain less than 200",
    CART:"READY INSERT"
    
  },
}
const REQ = {
  USERS:
  {
    // /*-------------------------register--------------*/
    GET_BY_PHONE:
    'SELECT count(*) as cnt,id_user,password,confirmation,type FROM user WHERE phone = ?',
    GET_BY_EMAIL:
     'SELECT count(*) as cnt FROM user WHERE email = ?',
    GET_BY_PSWD:
     'SELECT count(*) as cnt from user WHERE password = ?',
     GET_BY_NEXMO_PHONE:
     'SELECT count(*) as cnt from user WHERE nexmo=? and phone = ?',      
    ADD_USER:
    'INSERT INTO `user`(`fullName`, `phone`, `password`,`type`,`profil`,`lat`, `lng`) values (?,?,?,?,?,?,?)',
     UPDATE_NEXMO:
     'UPDATE `user` SET nexmo=? WHERE phone = ?',
     GET_VER:
     'SELECT confirmation FROM `user` WHERE `phone` = ?',
    DELETE_USER:
     'DELETE FROM `user` WHERE `phone` = ?',
    CONFIRMATON:
     'UPDATE user SET  confirmation =  1 WHERE `phone` = ?',
    GET_REGION:
      'SELECT * FROM `regions`',
    UPDATE_PSWD:
    'UPDATE `user` SET `password`=? WHERE phone = ?',
    GET_CATEGOY:
    'SELECT * FROM `categorie`',
    GET_BY_CAT:
    'SELECT i.name_images,a.*,c.name_categorie,u.phone FROM images i,annonces a, categorie c , user u WHERE i.id_annonce = a.id_annonce and i.i = 0 and c.id_categorie = a.id_categorie and c.id_categorie = ? and a.id_user = u.id_user and a.id_user=?',
    GET_ALL:
    'SELECT i.name_images,a.*,c.name_categorie,u.phone,u.lat,u.lng  FROM images i,annonces a,user u,  categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user   and c.id_categorie = a.id_categorie and a.type_annonce = ?',
    GET_ANN:
    'SELECT name_images FROM images WHERE  id_annonce = ?',
    ADD_IMAGE:
    'INSERT INTO `images`(`name_images`, `id_annonce`,`i`) VALUES (?,?,?)',
    ADD_ANNONCE:
    "INSERT INTO `annonces`(`description`, `quantity`, `prix`, `id_categorie`, `id_user`,`type_annonce`,`id_coop`) VALUES (?,?,?,?,?,?,?)",
    GET_IMAGE:
    "SELECT `name_images` FROM `images` WHERE `id_annonce` =? and i = 0",
    GET_INFO:
    "SELECT `fullName`,`phone`,`profil`,`lat`,`lng`,`type` FROM `user` WHERE `id_user`= ? ",
    UPDATE_NAME:
    'UPDATE `user` SET `fullName`=? WHERE id_user = ?',
    UPDATE_PSWD_BY_ID:
    'UPDATE `user` SET `password`=? WHERE id_user = ?',
    UPDATE_NAME_PSWD:
    'UPDATE `user` SET `fullName`=?,`password`=? WHERE id_user = ?',
    Get_MY_ANN:
    "SELECT i.name_images, a.*, c.name_categorie, u.phone FROM images i,annonces a,user u, categorie c WHERE i.id_annonce = a.id_annonce and u.id_user = a.id_user and c.id_categorie = a.id_categorie and u.id_user = ?",
    UPDATE_ANN:
    "UPDATE `annonces` SET `description`= ? ,`quantity`= ?,`prix`= ? WHERE `id_user` = ? and `id_annonce` = ?",
    DELETE_ANN:
    "DELETE FROM `annonces` WHERE `id_annonce` = ? and `id_user` = ?",
    UPDATE_PROFIL:
    "UPDATE `user` SET `profil`=? WHERE `id_user` = ?",
    GET_ALL_CF:
    'SELECT c.*,u.fullName,u.profil FROM `coop_ferme` c,user u WHERE c.id_user = u.id_user',
    GET_ANN_NFO:
    'SELECT i.name_images,a.*,c.name_categorie,u.phone,u.fullName  FROM images i,annonces a,user u, categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user  and  c.id_categorie = a.id_categorie and a.id_coop = ?',
    COUNT_CART:
    "SELECT count(*) as cnt FROM `Cart` WHERE`id_user`= ? and `id_annonce` = ?",
    INSERT_CART:
    "INSERT INTO `Cart`(`id_user`, `id_annonce`,`quantite`) VALUES (?,?,?)",
    GET_CART:
    "SELECT a.*,i.name_images FROM Cart c,annonces a ,images i WHERE a.id_annonce = c.id_annonce and i.id_annonce = a.id_annonce and c.id_user = ? ORDER BY a.id_coop",
    Get_MY_DEM:
    "SELECT i.name_images, a.*, u.fullName,s.fullName as acheteur FROM images i,annonces a,user u,user s, Cart c WHERE i.id_annonce = c.id_annonce and u.id_user = a.id_user and c.id_annonce = a.id_annonce and u.id_user = ? and s.id_user = c.id_user",
    ADD_FERME:
    "INSERT INTO `coop_ferme`(`id_user`, `lat`, `lng`, `type`) VALUES (?,?,?,?)",
    GET_FERME:
    "SELECT c.*,u.profil FROM coop_ferme c,user u WHERE c.id_user = ? and u.id_user = c.id_user",
    GET_ANN_CF:
    'SELECT i.name_images,a.*,c.name_categorie,u.phone  FROM images i,annonces a,user u, categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user   and c.id_categorie = a.id_categorie and a.id_coop = ?',
    GET_QUNATITE_ANN:
    'select quantity from  annonces WHERE `id_annonce` = ?',
    UPDATE_ANN_QUANTITE:
    'UPDATE `annonces` SET `quantity`= ? WHERE `id_annonce` = ?',
    GET_COOP:
    "SELECT SUM(a.quantity*a.prix) as total,a.id_coop FROM Cart c, annonces a WHERE a.id_annonce = c.id_annonce and c.id_user = ? GROUP BY a.id_coop",
    }
}
module.exports = {
  REQ,
  RESPONSES
}