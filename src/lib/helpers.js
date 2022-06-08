const helpers={};
const bcrypt=require('bcryptjs');

helpers.encryptPassword=async(contrasena)=>{
    const salt = await bcrypt.genSalt(5);
    const hash=  bcrypt.hash(contrasena,salt);
    return hash;
};

helpers.matchPassword=async(contrasena,savePasword)=>{
    console.log(contrasena,savePasword)
  try{
      return await bcrypt.compare(contrasena,savePasword);
  }catch (e) {
      console.log(e);
  }
};

module.exports=helpers;