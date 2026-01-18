// GenericTable.js
export default class GenericTable {
  constructor(primaryKey, fields, rows = []) {
    this.primaryKey = primaryKey; // 예: "id"
    this.fields = fields; // 예: ["id", "name", "memo"]
    this.rows = new Map(); // primaryKey -> row object

    if (Array.isArray(rows)) {
      for (const row of rows) {
        const key = row[this.primaryKey];
        if (key !== undefined) {
          this.rows.set(key, { ...row });
        }
      }
    }
  }

  insert(row) {
    const key = row[this.primaryKey];
    if (key === undefined) throw new Error("Primary key missing");
    this.rows.set(key, { ...row });
  }

  update(key, updates) {
    if (!this.rows.has(key)) return false;
    this.rows.set(key, { ...this.rows.get(key), ...updates });
    return true;
  }

  delete(key) {
    return this.rows.delete(key);
  }

  get(key) {
    return this.rows.get(key) || null;
  }

  getAll() {
    return Array.from(this.rows.values());
  }

  has(key) {
    return this.rows.has(key);
  }

  clear() {
    this.rows.clear();
  }
}
