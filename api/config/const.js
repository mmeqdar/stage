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
    DES_WRONG:"Description must contain less than 200"
    
  },
}
const REQ = {
  USERS:
  {
    // /*-------------------------register--------------*/
    GET_BY_PHONE:
    'SELECT count(*) as cnt,id_user,password,confirmation FROM user WHERE phone = ?',
    GET_BY_EMAIL:
     'SELECT count(*) as cnt FROM user WHERE email = ?',
    GET_BY_PSWD:
     'SELECT count(*) as cnt from user WHERE password = ?',
     GET_BY_NEXMO_PHONE:
     'SELECT count(*) as cnt from user WHERE nexmo = ? AND phone = ?',
     ADD_USER:
     'INSERT INTO `user`(`fullName`, `phone`, `password`,`id_region`) values (?, ?, ?,?)',
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
    GET_BY_REG:
    'SELECT  i.name_images,a.*,r.name_region,c.name_categorie,u.phone  FROM images i,annonces a,user u, regions r, categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user and r.id_region = u.id_region and r.id_region = ? and c.id_categorie = a.id_categorie',
    GET_BY_CAT:
    'SELECT i.name_images,a.*,c.name_categorie,r.name_region,u.phone FROM images i,annonces a, categorie c , user u, regions r WHERE i.id_annonce = a.id_annonce and i.i = 0 and c.id_categorie = a.id_categorie and c.id_categorie = ? and a.id_user =u.id_user and u.id_region = r.id_region',
    GET_BY_CAT_REG:
    'SELECT i.name_images,a.*,r.name_region,c.name_categorie,u.phone FROM images i,annonces a,user u, regions r, categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user and r.id_region = u.id_region and r.id_region = ? and a.id_categorie = ? and c.id_categorie = a.id_categorie',
    GET_ALL:
    'SELECT i.name_images,a.*,r.name_region,c.name_categorie,u.phone FROM images i,annonces a,user u, regions r, categorie c WHERE i.id_annonce = a.id_annonce and i.i = 0 and u.id_user = a.id_user  and r.id_region = u.id_region  and c.id_categorie = a.id_categorie',
    GET_ANN:
    'SELECT name_images FROM images WHERE  id_annonce = ?',
    ADD_IMAGE:
    'INSERT INTO `images`(`name_images`, `id_annonce`,`i`) VALUES (?,?,?)',
    ADD_ANNONCE:
    "INSERT INTO `annonces`(`description`, `quantity`, `prix`, `id_categorie`, `id_user`) VALUES (?,?,?,?,?)",
    GET_IMAGE:
    "SELECT `name_images` FROM `images` WHERE `id_annonce` =? and i = 0"
    }
}
module.exports = {
  REQ,
  RESPONSES
}