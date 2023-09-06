import bcrypt from 'bcrypt';

export default function checkPassword(hash: string, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isValid) => {
      if (err) {
        reject(err);
      } else {
        resolve(isValid);
      }
    });
  });
}
