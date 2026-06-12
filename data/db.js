import initSqlJs from "sql.js"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"

const SQL = await initSqlJs()

class Statement {
  #db; #save; #sql; #prefix

  constructor(db, save, sql) {
    this.#db   = db
    this.#save = save
    this.#sql  = sql
    const m = sql.match(/[@:$]\w+/)
    this.#prefix = m ? m[0][0] : "@"
  }

  #params(args) {
    if (!args.length) return null
    if (args.length === 1) {
      const p = args[0]
      if (p == null) return null
      if (Array.isArray(p)) return p
      if (typeof p === "object") {
        const out = {}
        for (const [k, v] of Object.entries(p)) out[this.#prefix + k] = v
        return out
      }
      return [p]
    }
    return [...args]
  }

  #rows(args) {
    const stmt = this.#db.prepare(this.#sql)
    const p = this.#params(args)
    if (p) stmt.bind(p)
    const rows = []
    while (stmt.step()) rows.push(stmt.getAsObject())
    stmt.free()
    return rows
  }

  run(...args) {
    const p = this.#params(args)
    if (p) this.#db.run(this.#sql, p)
    else   this.#db.run(this.#sql)
    this.#save()
  }

  get(...args)  { return this.#rows(args)[0] ?? null }
  all(...args)  { return this.#rows(args) }
}

export class DatabaseSync {
  #db; #path; #inTx = false

  constructor(path) {
    mkdirSync(dirname(path), { recursive: true })
    const buf   = existsSync(path) ? readFileSync(path) : null
    this.#db    = new SQL.Database(buf)
    this.#path  = path
  }

  #save() {
    if (!this.#inTx) writeFileSync(this.#path, Buffer.from(this.#db.export()))
  }

  exec(sql)    { this.#db.exec(sql); this.#save() }
  prepare(sql) { return new Statement(this.#db, () => this.#save(), sql) }

  transaction(fn) {
    return (...args) => {
      this.#db.run("BEGIN")
      this.#inTx = true
      try {
        fn(...args)
        this.#db.run("COMMIT")
      } catch (e) {
        this.#db.run("ROLLBACK")
        throw e
      } finally {
        this.#inTx = false
        this.#save()
      }
    }
  }
}
