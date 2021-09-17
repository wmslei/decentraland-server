"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Model = void 0;
var db_1 = require("./db");
var Model = (function () {
    function Model(attributes) {
        var Constructor = this.getConstructor();
        this.tableName = Constructor.tableName;
        this.primaryKey = Constructor.primaryKey;
        if (attributes) {
            this.attributes = attributes;
        }
    }
    Model.setDb = function (clientName) {
        if (clientName === void 0) { clientName = 'postgres'; }
        this.db = db_1.clients[clientName];
    };
    Model.find = function (conditions, orderBy, extra) {
        return this.db.select(this.tableName, conditions, orderBy, extra);
    };
    Model.findOne = function (primaryKeyOrCond, orderBy) {
        var _a;
        var conditions = typeof primaryKeyOrCond === 'object'
            ? primaryKeyOrCond
            : (_a = {}, _a[this.primaryKey] = primaryKeyOrCond, _a);
        return this.db.selectOne(this.tableName, conditions, orderBy);
    };
    Model.count = function (conditions, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.count(this.tableName, conditions, extra)];
                    case 1:
                        result = _a.sent();
                        return [2, result.length ? parseInt(result[0].count, 10) : 0];
                }
            });
        });
    };
    Model.query = function (queryString, values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.db.query(queryString, values)];
            });
        });
    };
    Model.create = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.insert(row)];
            });
        });
    };
    Model.upsert = function (row, onConflict) {
        if (onConflict === void 0) { onConflict = { target: [this.primaryKey] }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.insert(row, onConflict)];
            });
        });
    };
    Model.update = function (changes, conditions) {
        changes = this.withTimestamps
            ? __assign(__assign({}, changes), { updated_at: changes.updated_at || new Date() }) : changes;
        return this.db.update(this.tableName, changes, conditions);
    };
    Model.delete = function (conditions) {
        return this.db.delete(this.tableName, conditions);
    };
    Model.insert = function (row, onConflict) {
        return __awaiter(this, void 0, void 0, function () {
            var changes, now, changes, insertion, newRow;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        row = Object.assign({}, row);
                        if (onConflict) {
                            changes = Object.assign({}, onConflict.changes);
                            onConflict.changes = onConflict.changes ? changes : row;
                        }
                        if (this.withTimestamps) {
                            now = new Date();
                            Object.assign(row, {
                                created_at: row.created_at || now,
                                updated_at: row.updated_at || now
                            });
                            if (onConflict) {
                                changes = onConflict.changes || {};
                                changes.updated_at = changes.updated_at || now;
                                onConflict.changes = changes;
                            }
                        }
                        return [4, this.db.insert(this.tableName, row, this.primaryKey, onConflict)];
                    case 1:
                        insertion = _b.sent();
                        newRow = insertion.rows[0];
                        if (newRow && this.primaryKey) {
                            Object.assign(row, (_a = {}, _a[this.primaryKey] = newRow[this.primaryKey], _a));
                        }
                        return [2, row];
                }
            });
        });
    };
    Model.prototype.getConstructor = function () {
        return this.constructor;
    };
    Model.prototype.getDefaultQuery = function () {
        var query = {};
        query[this.primaryKey] = this.get(this.primaryKey);
        return query;
    };
    Model.prototype.retreive = function (conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var Constructor, query, attributes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Constructor = this.getConstructor();
                        query = conditions ? conditions : this.getDefaultQuery();
                        return [4, Constructor.findOne(query)];
                    case 1:
                        attributes = _a.sent();
                        if (attributes) {
                            this.attributes = attributes;
                        }
                        return [2, this.attributes];
                }
            });
        });
    };
    Model.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConstructor().create(this.attributes)];
                    case 1:
                        row = _a.sent();
                        this.set(this.primaryKey, row[this.primaryKey]);
                        return [2, row];
                }
            });
        });
    };
    Model.prototype.upsert = function (onConflict) {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getConstructor().upsert(this.attributes, onConflict)];
                    case 1:
                        row = _a.sent();
                        this.set(this.primaryKey, row[this.primaryKey]);
                        return [2, row];
                }
            });
        });
    };
    Model.prototype.update = function (conditions) {
        var query = conditions ? conditions : this.getDefaultQuery();
        return this.getConstructor().update(this.attributes, query);
    };
    Model.prototype.delete = function (conditions) {
        var query = conditions ? conditions : this.getDefaultQuery();
        return this.getConstructor().delete(query);
    };
    Model.prototype.isEmpty = function () {
        return !this.attributes || Object.keys(this.attributes).length === 0;
    };
    Model.prototype.get = function (key) {
        return this.attributes[key];
    };
    Model.prototype.getAll = function () {
        return this.attributes;
    };
    Model.prototype.getIn = function (keyPath) {
        if (keyPath.length === 0)
            return null;
        var value = this.attributes;
        for (var _i = 0, keyPath_1 = keyPath; _i < keyPath_1.length; _i++) {
            var prop = keyPath_1[_i];
            if (!value)
                return null;
            value = value[prop];
        }
        return value;
    };
    Model.prototype.set = function (key, value) {
        this.attributes[key] = value;
        return this;
    };
    Model.prototype.setIn = function (keyPath, value) {
        var keyAmount = keyPath.length;
        var nested = this.attributes;
        for (var i = 0; i < keyAmount; i++) {
            if (!nested)
                return null;
            var key = keyPath[i];
            if (i + 1 === keyAmount) {
                nested[key] = value;
            }
            else {
                nested = nested[key];
            }
        }
        return this;
    };
    Model.prototype.assign = function (template) {
        this.attributes = Object.assign({}, this.attributes, template);
        return this;
    };
    Model.tableName = '';
    Model.primaryKey = 'id';
    Model.withTimestamps = true;
    Model.db = db_1.clients.postgres;
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map