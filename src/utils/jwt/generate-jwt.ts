import jwt from 'jsonwebtoken';

export function generateJwt(user_uuid: string, role_id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({ user_uuid, role_id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Error generando JWT');
      } else {
        resolve(token!);
      }
    });
  });
}
