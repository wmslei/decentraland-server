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
exports.sendError = exports.sendOk = exports.extractFromReq = exports.handleRequest = exports.useRollbar = void 0;
var Rollbar = require("rollbar");
var rollbar;
function useRollbar(accessToken) {
    if (!accessToken)
        return;
    rollbar = new Rollbar({ accessToken: accessToken });
}
exports.useRollbar = useRollbar;
function handleRequest(callback) {
    var _this = this;
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1, data, message, statusCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, callback(req, res)];
                case 1:
                    data = _a.sent();
                    return [2, res.json(sendOk(data))];
                case 2:
                    error_1 = _a.sent();
                    data = error_1.data || {};
                    message = error_1.message;
                    statusCode = error_1.statusCode;
                    if (rollbar)
                        rollbar.error(error_1, req);
                    if (statusCode) {
                        res.status(statusCode);
                    }
                    return [2, res.json(sendError(data, message))];
                case 3: return [2];
            }
        });
    }); };
}
exports.handleRequest = handleRequest;
function extractFromReq(req, param) {
    var value;
    if (req.query && req.query[param]) {
        value = req.query[param];
    }
    else if (req.body && req.body[param]) {
        value = req.body[param];
    }
    else if (req.params && req.params[param]) {
        value = req.params[param];
    }
    if (!value) {
        throw new Error("Could not get " + param + " from request");
    }
    return value;
}
exports.extractFromReq = extractFromReq;
function sendOk(data) {
    return { ok: true, data: data };
}
exports.sendOk = sendOk;
function sendError(data, error) {
    return { ok: false, data: data, error: error };
}
exports.sendError = sendError;
//# sourceMappingURL=index.js.map