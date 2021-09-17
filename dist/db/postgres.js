"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgres = exports.Postgres = void 0;
var pg = require("pg");
var Postgres = (function () {
    function Postgres() {
    }
    Postgres.prototype.connect = function (connectionString) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client = new pg.Client(connectionString);
                        return [4, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [2, this.client];
                }
            });
        });
    };
    Postgres.prototype.query = function (queryString, values) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.query(queryString, values)];
                    case 1:
                        result = _a.sent();
                        return [2, result.rows];
                }
            });
        });
    };
    Postgres.prototype.count = function (tableName, conditions, extra) {
        if (extra === void 0) { extra = ''; }
        return this._query('SELECT COUNT(*) as count', tableName, conditions, undefined, extra);
    };
    Postgres.prototype.select = function (tableName, conditions, orderBy, extra) {
        return this._query('SELECT *', tableName, conditions, orderBy, extra);
    };
    Postgres.prototype.selectOne = function (tableName, conditions, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._query('SELECT *', tableName, conditions, orderBy, 'LIMIT 1')];
                    case 1:
                        rows = _a.sent();
                        return [2, rows[0]];
                }
            });
        });
    };
    Postgres.prototype.insert = function (tableName, changes, primaryKey, onConflict) {
        if (primaryKey === void 0) { primaryKey = ''; }
        if (onConflict === void 0) { onConflict = { target: [], changes: {} }; }
        return __awaiter(this, void 0, void 0, function () {
            var values, conflictValues, returning;
            return __generator(this, function (_a) {
                if (!changes) {
                    throw new Error("Tried to perform an insert on " + tableName + " without any values. Supply a changes object");
                }
                values = Object.values(changes);
                conflictValues = Object.values(onConflict.changes || {});
                returning = primaryKey ? "RETURNING " + primaryKey : '';
                return [2, this.client.query("INSERT INTO " + tableName + "(\n        " + this.toColumnFields(changes) + "\n      ) VALUES(\n        " + this.toValuePlaceholders(changes) + "\n      )\n        " + this.toOnConflictUpsert(onConflict, values.length) + "\n        " + returning, values.concat(conflictValues))];
            });
        });
    };
    Postgres.prototype.update = function (tableName, changes, conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var changeValues, conditionValues, whereClauses, values;
            return __generator(this, function (_a) {
                if (!changes) {
                    throw new Error("Tried to update " + tableName + " without any values. Supply a changes object");
                }
                if (!conditions) {
                    throw new Error("Tried to update " + tableName + " without a WHERE clause. Supply a conditions object");
                }
                changeValues = Object.values(changes);
                conditionValues = Object.values(conditions);
                whereClauses = this.toAssignmentFields(conditions, changeValues.length);
                values = changeValues.concat(conditionValues);
                return [2, this.client.query("UPDATE " + tableName + "\n      SET   " + this.toAssignmentFields(changes) + "\n      WHERE " + whereClauses.join(' AND '), values)];
            });
        });
    };
    Postgres.prototype.delete = function (tableName, conditions) {
        if (!conditions) {
            throw new Error("Tried to update " + tableName + " without a WHERE clause. Supply a conditions object");
        }
        var values = Object.values(conditions);
        return this.client.query("DELETE FROM " + tableName + "\n      WHERE " + this.toAssignmentFields(conditions).join(' AND '), values);
    };
    Postgres.prototype.createTable = function (tableName, rows, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, sequenceName, _b, primaryKey, primaryKeyClause;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options.sequenceName, sequenceName = _a === void 0 ? tableName + "_id_seq" : _a, _b = options.primaryKey, primaryKey = _b === void 0 ? '' : _b;
                        primaryKeyClause = primaryKey ? "PRIMARY KEY (\"" + primaryKey + "\")" : '';
                        if (!sequenceName) return [3, 2];
                        return [4, this.createSequence(sequenceName)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2: return [4, this.client.query("CREATE TABLE IF NOT EXISTS \"" + tableName + "\" (\n      " + rows + "\n      " + primaryKeyClause + "\n    );")];
                    case 3:
                        _c.sent();
                        if (!sequenceName) return [3, 5];
                        return [4, this.alterSequenceOwnership(sequenceName, tableName)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    Postgres.prototype.createIndex = function (tableName, name, fields, conditions) {
        if (conditions === void 0) { conditions = {}; }
        var unique = conditions.unique === true ? 'UNIQUE' : '';
        return this.client.query("CREATE " + unique + " INDEX IF NOT EXISTS " + name + " ON " + tableName + " (" + fields.join(',') + ")");
    };
    Postgres.prototype.createSequence = function (name) {
        try {
            return this.client.query("CREATE SEQUENCE " + name + ";");
        }
        catch (e) {
        }
    };
    Postgres.prototype.alterSequenceOwnership = function (name, owner, columnName) {
        if (columnName === void 0) { columnName = 'id'; }
        return this.client.query("ALTER SEQUENCE " + name + " OWNED BY " + owner + "." + columnName + ";");
    };
    Postgres.prototype.truncate = function (tableName) {
        return this.client.query("TRUNCATE " + tableName + " RESTART IDENTITY;");
    };
    Postgres.prototype.toOnConflictUpsert = function (_a, indexStart) {
        var target = _a.target, changes = _a.changes;
        if (indexStart === void 0) { indexStart = 0; }
        return target.length > 0 && changes
            ? "ON CONFLICT (" + target + ") DO\n        UPDATE SET " + this.toAssignmentFields(changes, indexStart)
            : 'ON CONFLICT DO NOTHING';
    };
    Postgres.prototype.toColumnFields = function (columns) {
        var columnNames = Object.keys(columns);
        return columnNames.map(function (name) { return "\"" + name + "\""; });
    };
    Postgres.prototype.toAssignmentFields = function (columns, start) {
        if (start === void 0) { start = 0; }
        var columnNames = Object.keys(columns);
        return columnNames.map(function (column, index) { return "\"" + column + "\" = $" + (index + start + 1); });
    };
    Postgres.prototype.toValuePlaceholders = function (columns, start) {
        if (start === void 0) { start = 0; }
        var columnNames = Object.keys(columns);
        return columnNames.map(function (_, index) { return "$" + (index + start + 1); });
    };
    Postgres.prototype.getOrderValues = function (order) {
        return Object.keys(order).map(function (column) { return "\"" + column + "\" " + order[column]; });
    };
    Postgres.prototype.setTypeParser = function (oid, parser) {
        pg.types.setTypeParser(oid, parser);
    };
    Postgres.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.client.end()];
            });
        });
    };
    Postgres.prototype._query = function (method, tableName, conditions, orderBy, extra) {
        if (extra === void 0) { extra = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var values, where, order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = [];
                        where = '';
                        order = '';
                        if (conditions) {
                            values = Object.values(conditions);
                            where = "WHERE " + this.toAssignmentFields(conditions).join(' AND ');
                        }
                        if (orderBy) {
                            order = "ORDER BY " + this.getOrderValues(orderBy);
                        }
                        return [4, this.client.query(method + " FROM " + tableName + " " + where + " " + order + " " + extra, values)];
                    case 1:
                        result = _a.sent();
                        return [2, result.rows];
                }
            });
        });
    };
    return Postgres;
}());
exports.Postgres = Postgres;
exports.postgres = new Postgres();
//# sourceMappingURL=postgres.js.map