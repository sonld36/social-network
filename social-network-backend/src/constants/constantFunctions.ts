import { join } from "path";
import path = require("path");
import { uuid } from "uuidv4";
import { omit } from 'lodash';

export const editFileName = async (req, file, cb) => {
 
    const filename: string = uuid();
    const extension: string = path.parse(file.originalname).ext;
    const user: any = { ...req.user };

    cb(null, `${user.userId}_${filename}${extension}`);
}

export const getPathFile =  (postStatus) => {
  const res = postStatus.images.map(image => {
    return join(process.cwd(), image);
  });

  return res;
};

export const sanitizeUser = (user, ignoreFields = []) =>  {
  const sanitized = { ...user };
  // console.log(omit(sanitized, ['password', ...ignoreFields]));
  return omit(sanitized, ['password', ...ignoreFields]);
}

export const getJsonRes = (jsonObjects) => {
  // const res = jsonObjects.map(jsonObject => jsonObject["_doc"]);
  return jsonObjects["_doc"];
}

