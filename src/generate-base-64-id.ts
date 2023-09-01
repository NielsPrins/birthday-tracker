export default function generateBase64ID(length: number = 11): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const charactersLength = characters.length;
  let base64ID = '';

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * charactersLength);
    base64ID += characters.charAt(randomIndex);
  }

  return base64ID;
}
