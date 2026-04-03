import { MongoClient, type Collection } from "mongodb";

interface Deploy {
  _id: string;
  html: string;
  expiresAt: Date;
  createdAt: Date;
}

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://deveshb_lol:JuF4Riv6k5dqBfnW@poly-bot.4rhm04g.mongodb.net/?appName=poly-bot";

let client: MongoClient;
let deploys: Collection<Deploy>;

async function getCollection(): Promise<Collection<Deploy>> {
  if (deploys) return deploys;
  client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("htmldrop");
  deploys = db.collection<Deploy>("deploys");
  // TTL index — MongoDB auto-deletes expired docs
  await deploys.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(() => {});
  return deploys;
}

export async function saveDeploy(id: string, html: string, expiryMs: number) {
  const col = await getCollection();
  await col.insertOne({
    _id: id,
    html,
    expiresAt: new Date(Date.now() + expiryMs),
    createdAt: new Date(),
  });
}

export async function getDeploy(id: string): Promise<{ html: string; expiresAt: Date } | null> {
  const col = await getCollection();
  const doc = await col.findOne({ _id: id });
  if (!doc) return null;
  if (doc.expiresAt < new Date()) {
    await col.deleteOne({ _id: id });
    return null;
  }
  return { html: doc.html, expiresAt: doc.expiresAt };
}
