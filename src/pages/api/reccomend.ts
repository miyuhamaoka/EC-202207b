export default async function handler(req: any, res: any) {
  const response = await fetch('http://localhost:8000/order');
  const data = await response.json();
  res.status(200).json({ data });
}
