"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = exports.SQL = exports.SQLStatement = void 0;
var SQLStatement = (function () {
    function SQLStatement(queryParts, values) {
        var _a, _b;
        this.queryParts = queryParts.slice(0);
        this.values = [];
        var index = 0;
        var nestedIndex = 0;
        for (; index < values.length; index++, nestedIndex++) {
            var statement = values[index];
            if (statement instanceof SQLStatement) {
                if (statement.values.length > 0) {
                    var left = this.getLeftQueryPart(statement.queryParts, nestedIndex);
                    var middle = this.getMiddleQueryParts(statement.queryParts);
                    var right = this.getRightQueryPart(statement.queryParts, nestedIndex);
                    (_a = this.queryParts).splice.apply(_a, __spreadArrays([nestedIndex, 2, left], middle, [right]));
                    (_b = this.values).push.apply(_b, statement.values);
                    nestedIndex += middle.length;
                }
                else {
                    var fullQueryPart = this.queryParts[nestedIndex] +
                        statement.queryParts[0] +
                        this.queryParts[nestedIndex + 1];
                    this.queryParts.splice(nestedIndex, 2, fullQueryPart);
                    nestedIndex -= 1;
                }
            }
            else {
                this.values.push(statement);
            }
        }
    }
    SQLStatement.prototype.getLeftQueryPart = function (queryParts, index) {
        return this.queryParts[index] + queryParts[0];
    };
    SQLStatement.prototype.getMiddleQueryParts = function (queryParts) {
        return queryParts.slice(1, queryParts.length - 1);
    };
    SQLStatement.prototype.getRightQueryPart = function (queryParts, index) {
        return queryParts[queryParts.length - 1] + this.queryParts[index + 1];
    };
    Object.defineProperty(SQLStatement.prototype, "text", {
        get: function () {
            return this.queryParts.reduce(function (prev, curr, index) { return prev + '$' + index + curr; });
        },
        enumerable: false,
        configurable: true
    });
    SQLStatement.prototype.append = function (statement) {
        if (statement instanceof SQLStatement) {
            this.queryParts[this.queryParts.length - 1] += statement.queryParts[0];
            this.queryParts.push.apply(this.queryParts, statement.queryParts.slice(1));
            var values = this.values;
            values.push.apply(this.values, statement.values);
        }
        else {
            this.queryParts[this.queryParts.length - 1] += statement;
        }
        return this;
    };
    SQLStatement.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    return SQLStatement;
}());
exports.SQLStatement = SQLStatement;
exports.SQL = function (queryParts) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new SQLStatement(queryParts, args);
};
function raw(value) {
    return exports.SQL([value.toString()]);
}
exports.raw = raw;
exports.SQL.raw = raw;
//# sourceMappingURL=SQL.js.map