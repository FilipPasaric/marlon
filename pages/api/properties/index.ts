// pages/api/properties/index.ts

import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "public", "data", "properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // vrni vse nepremičnine
    const data = fs.readFileSync(filePath, "utf-8");
    const properties = JSON.parse(data);
    return res.status(200).json(properties);
  }

  if (req.method === "POST") {
    try {
      const newProperty = req.body;

      const data = fs.readFileSync(filePath, "utf-8");
      const properties = JSON.parse(data);

      properties.push(newProperty);

      fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");

      return res.status(201).json({ message: "Dodano!" });
    } catch (err) {
      console.error("Napaka pri shranjevanju:", err);
      return res.status(500).json({ error: "Napaka pri shranjevanju." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Metoda ${req.method} ni dovoljena`);
}
