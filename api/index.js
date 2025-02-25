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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.get("/eum", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { areaCd, type, uname } = req.query;
        if (!areaCd || !type) {
            return res.status(400).json({ error: "�ʼ� �Ķ���Ͱ� �����Ǿ����ϴ�." });
        }
        const api_url = "https://api.eum.go.kr/web/Rest/OP/searchZone";
        const response = yield axios_1.default.get(api_url, {
            params: {
                id: "ybg",
                key: "Wj0PNO4WCAAsndHQkqLz5A==",
                areaCd,
                type,
                uname,
            },
            responseType: "text",
        });
        res.setHeader("Content-Type", "application/xml;charset=utf-8");
        res.send(response.data);
    }
    catch (error) {
        console.error("API ��û �� ���� �߻�:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || error.message);
        res.status(((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || 500).send("API ��û ����");
    }
}));
app.listen(3000, () => {
    console.log("������ 3000�� ��Ʈ���� ���� ���Դϴ�.");
});
