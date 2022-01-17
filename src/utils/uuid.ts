export default function uuid(): string {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: string) => {
    const num = parseInt(c, 10);
    const random = crypto.getRandomValues(new Uint8Array(1))[0];

    return (num ^ random & (15 >> num) / 4).toString(16);
  });
}
