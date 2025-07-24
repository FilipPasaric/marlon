import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import type { Property } from "@/types/property";
import { propertySchema } from "@/types/property";

const filePath = path.join(process.cwd(), "public", "data", "properties.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Neveljaven ID." });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(data);

  const index = properties.findIndex((p) => p.id === parsedId);
  if (index === -1) {
    return res.status(404).json({ error: "Nepremičnina ni bila najdena." });
  }

  switch (req.method) {
    case "GET":
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(properties[index]);

    case "PUT":
      try {
        const parsed = propertySchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({ error: "Neveljavni podatki.", details: parsed.error.format() });
        }

        properties[index] = { ...parsed.data, id: parsedId };
        fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");
        return res.status(200).json({ message: "Posodobljeno." });
      } catch (err) {
        return res.status(500).json({ error: "Napaka pri shranjevanju." });
      }

    case "DELETE":
      try {
        properties.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), "utf-8");
        return res.status(200).json({ message: "Izbrisano." });
      } catch (err) {
        return res.status(500).json({ error: "Napaka pri brisanju." });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Metoda ${req.method} ni dovoljena`);
  }
}
